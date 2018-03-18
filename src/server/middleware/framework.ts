import { Middleware } from 'koa'
import { InitialStateDto } from '../../views/dto/initialState'

export const framework: Middleware = async (ctx, next) => {
  ctx.setClientInitialState = (key, value) => {
    if (!ctx.state.__serverState) {
      ctx.state.__serverState = {}
    }

    ctx.state.__serverState[key] = value
  }

  ctx.getClientInitialState = (key?: keyof InitialStateDto) => {
    if (!ctx.state.__serverState) {
      return null
    }
    if (!key) {
      return ctx.state.__serverState
    }

    return ctx.state.__serverState[key]
  }

  ctx.service = service => {
    return new service(ctx)
  }

  await next()
}
