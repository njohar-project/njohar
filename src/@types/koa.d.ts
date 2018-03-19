import * as Koa from 'koa'
import { IntlMessages } from '../server/locales'
import { InitialStateDto } from '../views/dto/initialState'

declare module 'koa' {
  interface Context extends Koa.Context {
    // tslint:disable-next-line:no-any
    getClientInitialState<T = any>(key: keyof InitialStateDto): T
    getClientInitialState(): InitialStateDto
    setClientInitialState<T>(key: keyof InitialStateDto, value: T)
    service<T>(ctor: { new (ctx: Koa.Context): T }): T
    translate(key: keyof IntlMessages, values?: Anything): string
  }

  class GqlError {
    constructor(data: GqlErrorData)
  }

  interface GqlErrorData {
    data: {
      [key: string]: Anything
    }
  }
}
