import { GraphQLList } from 'graphql'
import { ProductService } from '../../services'
import { ProductType } from './types'

export const getTopTenProducts: GqlFieldConfig = {
  type: new GraphQLList(ProductType),
  resolve: async (_source, _args, ctx) => {
    return ctx.service(ProductService).topTenList()
  }
}
