import { Locale } from 'antd/lib/locale-provider'
import { GraphQLArgumentConfig, GraphQLFieldConfig } from 'graphql'
import { Context, Middleware } from 'koa'
import { IRouterContext } from 'koa-router'
import { SingletonRouter } from 'next/router'
import { Dispatch } from 'react-redux'
import { UserDto } from '../views/dto/user/user'

declare global {

  /**
   * Typesafe to force any. Use it carefully!
   */
  // tslint:disable-next-line:no-any
  type Anything = any

  interface DecodedJwtTokenInfo {
    exp: string | number
    user: UserDto
  }

  type AuthMiddleware = (role?: {}) => Middleware

  type ArgsOf<T> = { [argName in keyof T]: GraphQLArgumentConfig }

  interface GqlFieldConfig<TArgs = Anything>
    extends GraphQLFieldConfig<{}, IRouterContext, ArgsOf<TArgs> | Anything> {
    args?: ArgsOf<TArgs>
  }

  interface GqlMap {
    mutations: { [name: string]: GqlFieldConfig<Anything> }
    queries: { [name: string]: GqlFieldConfig<Anything> }
  }

  interface GqlError {
    graphQLErrors: Error[]
  }

  type ErrorMessage = Error | Error[] | GqlError

  interface StoreProps<T = Anything> {
    dispatch: Dispatch<T>
  }

  declare namespace NodeJS {
    interface Process {
      browser: boolean
    }
    interface Global {
      fetch: Anything
    }
  }

  interface WithRouteProps {
    router: SingletonRouter
  }

  interface WithLocaleProps {
    lang?: string
    locale?: Locale
  }

  interface WithLangProps {
    lang: string
  }

  declare const __BASE_URL__
  declare const __GQL_END_POINT__
}
