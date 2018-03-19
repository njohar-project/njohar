import * as hasha from 'hasha'
import { Context } from 'koa'
import {
  AuthResultDto,
  LoginDto,
  RegisterDto,
  UserDto
} from '../../views/dto/user/user'
import { UserModel } from '../dataAccess'
import { ValidationError } from '../lib/ValidationError'
import { Repository } from '../repository'
import { Auth } from './auth'

export class UserService {
  ctx: Context
  users = new Repository(UserModel)

  constructor(ctx: Context) {
    this.ctx = ctx
  }

  async register(request: RegisterDto): Promise<AuthResultDto | undefined> {
    if (request.roles.indexOf('sa') > -1) {
      if ((await this.users.count()) > 0) {
        throw new ValidationError(this.ctx.translate('user:forbid-super-admin-registration'))
      }
    }

    const user = await this.users.create({
      name: request.name,
      credentials: {
        email: request.email,
        password: hasha(request.password)
      },
      roles: request.roles
    })

    const userDto: UserDto = {
      id: user._id,
      name: user.name,
      roles: user.roles
    }

    const token = Auth.generateToken(request.email, userDto)
    return {
      user: userDto,
      token
    }
  }

  async login(request: LoginDto): Promise<AuthResultDto | boolean> {
    // ref: https://stackoverflow.com/a/33971033/1586914
    const user = await this.users.single({
      'credentials.username': {
        $regex: `^${request.username}$`,
        $options: 'i'
      },
      'credentials.password': hasha(request.password)
    })

    if (user) {
      const userDto: UserDto = {
        id: user._id,
        name: user.name,
        roles: user.roles
      }

      const token = Auth.generateToken(request.username, userDto)
      return {
        user: userDto,
        token
      }
    }

    throw new ValidationError(this.ctx.translate('user:invalid-credential'))
  }

  async getUserFromToken(token: string): Promise<UserDto | null> {
    return Auth.getUserFromToken(token)
  }
}
