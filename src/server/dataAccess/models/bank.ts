import { SchemaTypes } from 'mongoose'
import * as shortid from 'shortid'
import { DataAccess } from '..'
import { Bank } from '../../domain/bank'

export const BankModel = () =>
  DataAccess.createSchema<Bank>('Bank', {
    _id: {
      type: SchemaTypes.String,
      default: shortid.generate
    },
    name: {
      type: SchemaTypes.String,
      required: true
    }
  })
