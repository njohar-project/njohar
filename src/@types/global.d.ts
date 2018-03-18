import { Locale } from 'antd/lib/locale-provider'
import { Context, Middleware } from 'koa'
import { SingletonRouter } from 'next/router'
import { Dispatch } from 'react-redux'
import { UserDto } from '../views/dto/user/user'
import { GraphQLFieldConfig, GraphQLArgumentConfig } from 'graphql'
import { IRouterContext } from 'koa-router'

declare global {
  interface DecodedJwtTokenInfo {
    exp: string | number
    user: UserDto
  }

  type AuthMiddleware = (role?: {}) => Middleware

  type ArgsOf<T> = { [argName in keyof T]: GraphQLArgumentConfig }

  interface GqlFieldConfig<TArgs = any>
    extends GraphQLFieldConfig<{}, IRouterContext, ArgsOf<TArgs> | any> {
    args?: ArgsOf<TArgs>
  }

  interface GqlMap {
    mutations: { [name: string]: GqlFieldConfig<any> }
    queries: { [name: string]: GqlFieldConfig<any> }
  }

  interface GqlError {
    graphQLErrors: Error[]
  }

  type ErrorMessage = Error | Error[] | GqlError

  interface StoreProps<T = any> {
    dispatch: Dispatch<T>
  }

  declare namespace NodeJS {
    interface Process {
      browser: boolean
    }
    interface Global {
      fetch: any
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
