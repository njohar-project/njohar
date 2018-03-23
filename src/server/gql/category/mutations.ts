import { GraphQLNonNull, GraphQLString } from 'graphql'
import { CreateCategoryDto } from './../../../views/dto/product/category'
import { CategoryService } from './../../services/category'

export const addCategory: GqlFieldConfig<CreateCategoryDto> = {
  type: GraphQLString,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (_source, args, ctx) => {
    return ctx.service(CategoryService).add(args)
  }
}
