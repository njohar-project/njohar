import { UserDto } from '../../dto/user/user'

export interface UserState {
  authenticated: boolean
  user?: UserDto
}
