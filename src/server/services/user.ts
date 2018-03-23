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

  async getUserCounts() {
    return this.users.count()
  }

  async register(request: RegisterDto): Promise<AuthResultDto | undefined> {
    const anyUser = (await this.getUserCounts()) > 0

    if (request.roles.indexOf('sa') > -1) {
      if (anyUser) {
        throw new ValidationError(
          this.ctx.translate('user:forbid-super-admin-registration')
        )
      }
    }

    if (
      this.users.any({
        'credentials.email': {
          $regex: `^${request.email}$`,
          $options: 'i'
        }
      })
    ) {
      throw new ValidationError(
        this.ctx.translate('user:email-already-taken', { email: request.email })
      )
    }

    const user = await this.users.create({
      name: request.name,
      credentials: {
        email: request.email.toLocaleLowerCase().trim(),
        password: hasha(request.password)
      },
      roles: anyUser ? request.roles : ['sa']
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
      'credentials.email': {
        $regex: `^${request.email}$`,
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

      const token = Auth.generateToken(request.email, userDto)
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
