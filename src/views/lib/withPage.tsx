import * as jwtDecode from 'jwt-decode'
import Router, { withRouter } from 'next/router'
import * as NProgress from 'nprogress'
import * as React from 'react'
import { CookieUtil } from '.'
import { JWT_KEY } from '../../lib/constants'
import { Wait } from '../components/Layout/wait'
import { UserDto } from '../dto/user/user'
import { changeLanguage } from '../store/common/actions'
import { setUser } from '../store/user/actions'
import { ServerProps } from './withData'

interface SpinState {
  ready: boolean
}

export interface PagePropsState {
  userState: {
    authenticated: boolean
    user: UserDto | null
  }
}

export type PageProps = PagePropsState & WithRouteProps

Router.onRouteChangeStart = () => {
  NProgress.start()
}

Router.onRouteChangeComplete = () => {
  NProgress.done()
}

Router.onRouteChangeError = () => {
  NProgress.done()
}

export function withPage<TProps = Anything, TState = Anything>(
  Component: React.ComponentClass
) {
  // type MergedState = TState & SpinState

  const Main = class extends React.Component<
    TProps & WithRouteProps,
    TState & SpinState
  > {
    static async getInitialProps({
      req,
      store
    }: ServerProps): Promise<PagePropsState> {
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

    constructor(props: TProps & WithRouteProps) {
      super(props)
      // @ts-ignore
      this.state = {
        ready: false
      }
    }

    componentDidMount() {
      this.setState({ ready: true })
    }

    render() {
      if (!this.state.ready) {
        return <Wait />
      }

      return <Component {...this.props} />
    }
  }

  return withRouter(Main)
}

function getCachedProps(): PagePropsState {
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
    (!jwt.exp || jwt.exp >= Date.now().valueOf() / 1000)
  )

  return {
    userState: {
      authenticated,
      user: jwt.user
    }
  }
}
