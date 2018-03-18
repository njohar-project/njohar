import { SchemaTypes } from 'mongoose'
import * as shortid from 'shortid'
import { DataAccess } from '..'
import { Product } from '../../domain/product'

export const ProductModel = () =>
  DataAccess.createSchema<Product>(
    'Product',
    {
      _id: {
        type: SchemaTypes.String,
        default: shortid.generate
      },
      name: SchemaTypes.String,
      thumb: SchemaTypes.String,
      createdAt: SchemaTypes.Date,
      updatedAt: SchemaTypes.Date
    },
    null,
    {
      timestamps: true
    }
  )
