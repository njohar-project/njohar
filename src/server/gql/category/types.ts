import { GraphQLString } from 'graphql'
import { createType } from '../utils'
import { CategoryDto } from './../../../views/dto/product/category';

export const CategoryType = createType<CategoryDto>('Category', {
  id: { type: GraphQLString },
  name: { type: GraphQLString },
})
