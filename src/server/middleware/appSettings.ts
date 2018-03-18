import { Middleware } from 'koa'
import { LANG_KEY } from '../../lib/constants'

export const appSettings: Middleware = async (ctx, next) => {
  const language = ctx.cookies.get(LANG_KEY)
  ctx.setClientInitialState('language', language || 'en-US')
  await next()
}
