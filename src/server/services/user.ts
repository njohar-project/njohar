import * as crypto from 'crypto'
import * as hasha from 'hasha'
import * as jwt from 'jsonwebtoken'
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

export class UserService {
  ctx: Context
  users = new Repository(UserModel)

  constructor(ctx: Context) {
    this.ctx = ctx
  }

  async register(request: RegisterDto): Promise<AuthResultDto | undefined> {
    try {
      const user = await this.users.create({
        name: request.name,
        credentials: {
          username: request.username,
          password: hasha(request.password)
        }
      })

      const userDto: UserDto = {
        id: user._id,
        name: user.name
      }

      const token = this.generateToken(request.username, userDto)
      return {
        user: userDto,
        token
      }
    } catch (error) {
      this.ctx.throw(error, 400)
      return undefined
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
        name: user.name
      }

      const token = this.generateToken(request.username, userDto)
      return {
        user: userDto,
        token
      }
    }

    throw new ValidationError('Invalid user name or password')
  }

  generateToken(username: string, user: UserDto) {
    return jwt.sign(
      {
        user,
        username,
        xsrfToken: crypto
          .createHash('md5')
          .update(username)
          .digest('hex')
      },
      'jwtSecret'
      // {
      //   expiresIn: '365 days'
      // }
    )
  }

  async getUserFromToken(token: string): Promise<UserDto | null> {
    const decoded = await this.verifyToken(token)
    if (decoded) {
      return decoded.user
    }
    return null
  }

  // tslint:disable-next-line:no-any
  async verifyToken<TResult = any>(token: string): Promise<TResult | boolean> {
    if (!token) {
      return false
    }

    return new Promise<TResult | boolean>(resolve => {
      jwt.verify(
        token,
        'jwtSecret',
        (err, decoded: TResult & DecodedJwtTokenInfo) => {
          if (err) {
            resolve(false)
          } else {
            if (!decoded || decoded.exp < Date.now().valueOf() / 1000) {
              resolve(false)
            } else {
              resolve(decoded)
            }
          }
        }
      )
    })
  }
}
