import { GraphQLList } from 'graphql'
import { CategoryService } from './../../services/category';
import { CategoryType } from './types'

export const category: GqlFieldConfig = {
  type: new GraphQLList(CategoryType),
  resolve: async (_source, _args, ctx) => {
    return ctx.service(CategoryService).list()
  }
}
