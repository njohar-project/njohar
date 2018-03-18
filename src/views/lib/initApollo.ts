import { ApolloClient } from 'apollo-client'
import { HttpLink, InMemoryCache } from 'apollo-client-preset'
import { onError } from 'apollo-link-error'
import { Dispatch } from 'react-redux'
import { RootState } from '../store'
import { SET_ERROR } from '../store/common/reducers'

// tslint:disable-next-line:no-var-requires
const fetch = require('isomorphic-unfetch')

let apolloClient: ApolloClient<{}> | null = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

const errorLink = (dispatch?: Dispatch<RootState>) =>
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      const err = graphQLErrors[0] || networkError
      // @ts-ignore
      if ((!err || !err.safe) && dispatch) {
        dispatch({ type: SET_ERROR, payload: err })
      }
    }
  })

// tslint:disable-next-line:no-any
function create(initialState: any, dispatch?: Dispatch<RootState>) {
  const httpLink = new HttpLink({
    uri: __BASE_URL__ + __GQL_END_POINT__, // Server URL (must be absolute)
    credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`,
    // headers
  })

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: errorLink(dispatch).concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {})
  })
}

export default function initApollo(
  // tslint:disable-next-line:no-any
  initialState?: any,
  dispatch?: Dispatch<RootState>
) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, dispatch)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, dispatch)
  }

  return apolloClient
}
