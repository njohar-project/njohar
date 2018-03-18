import { IncomingMessage, ServerResponse } from 'http'
import * as jwtDecode from 'jwt-decode'
import Router from 'next/router'
import * as NProgress from 'nprogress'
import * as React from 'react'
import { Store } from 'react-redux'
import { JWT_KEY } from '../../lib/constants'
import { UserDto } from '../dto/user/user'
import { CookieUtil } from '../lib'
import { WithDataProps } from '../lib/withData'
import { RootState } from '../store'
import { changeLanguage } from '../store/common/actions'
import { setUser } from '../store/user/actions'

export interface ServerProps {
  store: Store<RootState>
  isServer: boolean
  req?: IncomingMessage
  res?: ServerResponse
  query?: string
  asPath?: string
  pathname?: string
}

export interface PageProps {
  userState: {
    authenticated: boolean
    user: UserDto | null
  }
}

Router.onRouteChangeStart = () => {
  NProgress.start()
}

Router.onRouteChangeComplete = () => {
  NProgress.done()
}

Router.onRouteChangeError = () => {
  NProgress.done()
}

export abstract class Page<Props = {}, State = {}> extends React.Component<
  Props & PageProps & WithDataProps,
  State
> {
  static async getInitialProps({
    req,
    store
  }: ServerProps): Promise<PageProps> {
    if (req) {
      // server side
      store.dispatch(setUser(req.serverState.user))
      store.dispatch(changeLanguage(req.serverState.language))
      return {
        userState: {
          authenticated: !!req.serverState.user,
          user: req.serverState.user
        }
      }
    }

    // client side
    return getCachedProps()
  }
}

function getCachedProps(): PageProps {
  // ensure token is valid
  const token = CookieUtil.getCookie(JWT_KEY)
  if (!token || token === '') {
    return {
      userState: {
        authenticated: false,
        user: null
      }
    }
  }

  // ensure JWT is valid and not expired
  const jwt = jwtDecode<DecodedJwtTokenInfo>(token)
  const authenticated = !!(
    jwt &&
    jwt.exp &&
    (jwt.exp === 'undefined' || jwt.exp >= Date.now().valueOf() / 1000)
  )

  return {
    userState: {
      authenticated,
      user: jwt.user
    }
  }
}
