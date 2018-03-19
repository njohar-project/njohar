import * as crypto from 'crypto'
import * as jwt from 'jsonwebtoken'
import { UserDto } from '../../views/dto/user/user'

export class Auth {
  static generateToken(username: string, user: UserDto) {
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

  // tslint:disable-next-line:no-any
  static async verifyToken<TResult = any>(token: string): Promise<TResult | boolean> {
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

  static async getUserFromToken(token: string): Promise<UserDto | null> {
    const decoded = await Auth.verifyToken(token)
    if (decoded) {
      return decoded.user
    }
    return null
  }
}
