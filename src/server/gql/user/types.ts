import { GraphQLString } from 'graphql'
import { AuthResultDto, UserDto } from '../../../views/dto/user/user'
import { createType } from '../utils'

export const UserType = createType<UserDto>('User', {
  id: { type: GraphQLString },
  name: { type: GraphQLString }
})

export const AuthResultType = createType<AuthResultDto>('AuthResult', {
  token: { type: GraphQLString },
  user: { type: UserType }
})
