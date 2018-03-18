import { JWT_KEY } from '../../lib/constants'
import { UserService } from '../services'

/**
 * Ensure that request is authenticated otherwise throws 401.
 */
export const authenticated: AuthMiddleware = (/*role*/) => async (
  ctx,
  next
) => {
  const token = ctx.request.headers[JWT_KEY] || ctx.cookies.get(JWT_KEY)

  if (!token) {
    ctx.throw(401, 'Unauthorized')
    return
  }

  if (!await ctx.service(UserService).verifyToken(token)) {
    ctx.throw(401, 'Unauthorized')
    return
  }

  await next()
}
