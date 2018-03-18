import { GraphQLNonNull, GraphQLString } from 'graphql'
import { LoginDto, RegisterDto } from '../../../views/dto/user/user'
import { AuthService } from '../../services'
import { AuthResultType } from './types'

export const login: GqlFieldConfig<LoginDto> = {
  type: AuthResultType,
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (source, args, ctx) => {
    return ctx.service(AuthService).login(args)
  }
}

export const register: GqlFieldConfig<RegisterDto> = {
  type: AuthResultType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (source, args, ctx) => {
    return ctx.service(AuthService).register(args)
  }
}
