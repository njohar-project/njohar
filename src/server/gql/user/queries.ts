import { UserType } from './types'

export const getCurrent: GqlFieldConfig = {
  type: UserType,
  resolve(_source, _args, ctx) {
    return ctx.getClientInitialState('user')
  }
}
