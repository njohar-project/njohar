import ApolloClient from 'apollo-client'
import Head from 'next/head'
import * as React from 'react'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { Dispatch } from 'react-redux'
import { ServerProps } from '../pages/_page'
import { RootState } from '../store'
import initApollo from './initApollo'

// Gets the display name of a JSX component for dev tools
function getComponentDisplayName(Component: React.ComponentClass) {
  return Component.displayName || Component.name || 'Unknown'
}

interface WithDataComponentType {
  getInitialProps?: (ctx: ServerProps) => {}
}

interface ServerStateType {
  apollo: {
    data: {}
  }
}

export interface WithDataProps extends StoreProps<RootState> {
  serverState: ServerStateType
}

export default (
  // tslint:disable-next-line:no-any
  ComposedComponent: React.ComponentClass & WithDataComponentType
) => {
  return class WithData extends React.Component<WithDataProps> {
    static displayName = `WithData(${getComponentDisplayName(
      ComposedComponent
    )})`

    apollo: ApolloClient<{}>

    static async getInitialProps(ctx: ServerProps) {
      // Initial serverState with apollo (empty)
      let serverState: ServerStateType = {
        apollo: {
          data: {}
        }
      }

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {}
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx)
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo(
        undefined,
        ctx.store ? ctx.store.dispatch : undefined
      )
      try {
        // Run all GraphQL queries
        await getDataFromTree(
          <ApolloProvider client={apollo}>
            <ComposedComponent {...composedInitialProps} />
          </ApolloProvider>,
          {
            router: {
              asPath: ctx.asPath,
              pathname: ctx.pathname,
              query: ctx.query
            }
          }
        )
      } catch (error) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // Handle them in components via the data.error prop:
        // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
      }

      if (!process.browser) {
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()
      }

      // Extract query data from the Apollo store
      serverState = {
        apollo: {
          data: apollo.cache.extract()
        }
      }

      return {
        serverState,
        ...composedInitialProps
      }
    }

    constructor(props: WithDataProps) {
      super(props)
      this.apollo = initApollo(
        this.props.serverState.apollo.data,
        props.dispatch
      )
    }

    render() {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      )
    }
  }
}
