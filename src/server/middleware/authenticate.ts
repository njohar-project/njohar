import { Middleware } from 'koa'
import { JWT_KEY } from '../../lib/constants'
import { UserService } from '../services'

/**
 * Authenticate every request. It writes user's state as it's found.
 */
export const authenticate: Middleware = async (ctx, next) => {
  // const token = ctx.request.headers[JWT_KEY] || ctx.cookies.get(JWT_KEY)
  const token = ctx.cookies.get(JWT_KEY)
  const service = ctx.service(UserService)
  const user = await service.getUserFromToken(token)
  const fresh = (await service.getUserCounts()) <= 0
  ctx.setClientInitialState('user', user)
  ctx.setClientInitialState('fresh', fresh)

  await next()
}
