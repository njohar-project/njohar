import { GraphQLString } from 'graphql'
import { ProductDto } from '../../../views/dto/product/product'
import { createType } from '../utils'

export const ProductType = createType<ProductDto>('Product', {
  id: { type: GraphQLString },
  name: { type: GraphQLString },
  thumb: { type: GraphQLString },
  price: { type: GraphQLString },
  createdAt: { type: GraphQLString },
  updatedAt: { type: GraphQLString }
})
