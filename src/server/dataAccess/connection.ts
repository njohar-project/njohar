import {
  connect,
  connection,
  Connection,
  Document,
  Model,
  Mongoose,
  Schema,
  SchemaOptions,
  SchemaType,
  SchemaTypeOpts
} from 'mongoose'

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING as string

export class DataAccess {
  static mongooseInstance: Mongoose
  static mongooseConnection: Connection
  static compiledModels: { [key: string]: Model<Document> } = {}

  static async connect(): Promise<Mongoose> {
    if (this.mongooseInstance) {
      return this.mongooseInstance
    }

    this.mongooseConnection = connection
    this.mongooseConnection.once('open', () => {
      // tslint:disable-next-line:no-console
      console.log('> MongoDB connected: ', DB_CONNECTION_STRING)
    })

    this.mongooseInstance = await connect(DB_CONNECTION_STRING)
    return this.mongooseInstance
  }

  static createSchema<T>(
    name: string,
    // tslint:disable-next-line:no-any
    definition: { [key in keyof T]: SchemaTypeOpts<any> | Schema | SchemaType },
    hook?: ((schema: Schema) => void) | null,
    options?: SchemaOptions
  ): Model<T & Document> {
    if (!this.compiledModels[name]) {
      const schema = new Schema(definition, options)
      if (hook) {
        hook(schema)
      }
      this.compiledModels[name] = this.mongooseInstance.model(name, schema)
    }

    return this.compiledModels[name] as Model<T & Document>
  }
}
