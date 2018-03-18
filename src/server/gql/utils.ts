import { GraphQLObjectType, GraphQLObjectTypeConfig } from 'graphql'

// tslint:disable-next-line:no-any
type Obj<T> = { [key in keyof T]: any }

export function createType<T>(
  name: string,
  
  type: Obj<T>,
  // tslint:disable-next-line:no-any
  config?:  GraphQLObjectTypeConfig<any, any> 
): GraphQLObjectType {
  return new GraphQLObjectType({
    name,
    fields: () => type,
    ...config
  })
}