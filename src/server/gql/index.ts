// import { formatError } from 'apollo-errors'
import { graphiqlKoa, graphqlKoa } from 'apollo-server-koa'
import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import * as Router from 'koa-router'
import category from './category'
import product from './product'
import user from './user'

const DEBUG_MODE: boolean = process.env.NODE_ENV === 'development'
const endpointURL = process.env.GQL_END_POINT as string

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...user.queries,
    ...product.queries,
    ...category.queries
  })
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...user.mutations,
    ...product.mutations,
    ...category.mutations
  })
})

const schema = new GraphQLSchema({
  query,
  mutation
})

// tslint:disable-next-line:no-any
function formatError(err: any) {
  const oriError = err.originalError
  if (oriError && oriError.gql) {
    return {
      message: err.message,
      code: oriError.code,
      path: err.path,
      safe: true
    }
  }

  if (DEBUG_MODE) {
    return err
  }

  return {
    message: 'Something went wrong!',
    code: (err.originalError && err.originalError.code) || 500,
    path: err.path
  }
}

const router = new Router()
  .post(endpointURL, graphqlKoa(ctx => ({ schema, context: ctx, formatError })))
  .get(endpointURL, graphqlKoa(ctx => ({ schema, context: ctx, formatError })))

if (DEBUG_MODE) {
  router.get('/graphiql', graphiqlKoa({ endpointURL }))
}

export default router
