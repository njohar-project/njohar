import { Middleware } from 'koa'
import { JWT_KEY } from '../../lib/constants'
import { AuthService } from '../services'

/**
 * Authenticate every request. It writes user's state as it's found.
 */
export const authenticate: Middleware = async (ctx, next) => {
  // const token = ctx.request.headers[JWT_KEY] || ctx.cookies.get(JWT_KEY)
  const token = ctx.cookies.get(JWT_KEY)
  const user = await ctx.service(AuthService).getUserFromToken(token)
  ctx.setClientInitialState('user', user)
  await next()
}
