import { UserType } from './types'

export const getCurrent: GqlFieldConfig = {
  type: UserType,
  resolve(source, args, ctx) {
    return ctx.getClientInitialState('user')
  }
}
