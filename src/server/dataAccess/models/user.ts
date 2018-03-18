import { SchemaTypes } from 'mongoose'
import * as shortid from 'shortid'
import { DataAccess } from '..'
import { User } from '../../domain/user'

export const UserModel = () =>
  DataAccess.createSchema<User>('User', {
    _id: {
      type: SchemaTypes.String,
      default: shortid.generate
    },
    name: SchemaTypes.String,
    credentials: {
      type: SchemaTypes.Mixed
    }
  })
