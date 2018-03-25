import { GraphQLNonNull, GraphQLString } from 'graphql'
import { BaseDto } from './../../../views/dto/base';
import { CategoryDto, CreateCategoryDto } from './../../../views/dto/product/category'
import { CategoryService } from './../../services/category'
import { CategoryType } from './types';

export const addCategory: GqlFieldConfig<CreateCategoryDto> = {
  type: CategoryType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (_source, args, ctx) => {
    return ctx.service(CategoryService).add(args)
  }
}

export const editCategory: GqlFieldConfig<CategoryDto> = {
  type: CategoryType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (_source, args, ctx) => {
    return ctx.service(CategoryService).edit(args)
  }
}

export const deleteCategory: GqlFieldConfig<BaseDto> = {
  type: CategoryType,
  args: {
    id : {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve: async (_source, args, ctx) => {
    return ctx.service(CategoryService).delete(args.id)
  }
}
