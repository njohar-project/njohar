import { SchemaTypes } from 'mongoose'
import * as shortid from 'shortid'
import { DataAccess } from '..'
import { Category } from '../../domain/category'

export const CategoryModel = () =>
  DataAccess.createSchema<Category>('Category', {
    _id: {
      type: SchemaTypes.String,
      default: shortid.generate
    },
    name: {
      type: SchemaTypes.String,
      required: true
    }
  })
