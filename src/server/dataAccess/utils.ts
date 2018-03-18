import {
  Document,
  Model,
  Schema,
  SchemaOptions,
  SchemaType,
  SchemaTypeOpts
} from 'mongoose'
import { DataAccess } from './connection'

export function createSchema<T>(
  name: string,
  definition: {
    [key in keyof T]: SchemaTypeOpts<typeof SchemaType> | Schema | SchemaType
  },
  hook?: (schema: Schema) => void,
  options?: SchemaOptions
): Model<T & Document> {
  const schema = new Schema(definition, options)
  if (hook) {
    hook(schema)
  }
  return DataAccess.mongooseInstance.model(name, schema)
}
