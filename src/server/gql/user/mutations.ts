import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql'
import { LoginDto, RegisterDto } from '../../../views/dto/user/user'
import { UserService } from '../../services'
import { AuthResultType } from './types'

export const login: GqlFieldConfig<LoginDto> = {
  type: AuthResultType,
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (source, args, ctx) => {
    return ctx.service(UserService).login(args)
  }
}

export const register: GqlFieldConfig<RegisterDto> = {
  type: AuthResultType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    roles: { type: new GraphQLList(GraphQLString) }
  },
  resolve: async (source, args, ctx) => {
    return ctx.service(UserService).register(args)
  }
}
