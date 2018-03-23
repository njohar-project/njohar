import * as jwtDecode from 'jwt-decode'
import Router, { withRouter } from 'next/router'
import * as NProgress from 'nprogress'
import * as React from 'react'
import { Store } from 'react-redux'
import { CookieUtil } from '.'
import { JWT_KEY } from '../../lib/constants'
import { Wait } from '../components/Layout/wait'
import { UserDto } from '../dto/user/user'
import { RootState } from '../store'
import { changeLanguage, setFresh } from '../store/common/actions'
import { setUser } from '../store/user/actions'
import { ServerProps } from './withData'

interface SpinState {
  ready: boolean
}

export interface PagePropsState {
  userState: {
    authenticated: boolean
    user: UserDto | null
    fresh: boolean
  }
}

export type PageProps = PagePropsState & WithRouteProps & StoreProps

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
    TProps & PageProps,
    TState & SpinState
  > {
    static async getInitialProps({
      req,
      store
    }: ServerProps): Promise<PagePropsState> {
      if (req) {
        const { user, language, fresh } = req.serverState

        // server side
        store.dispatch(setFresh(fresh))
        store.dispatch(setUser(user))
        store.dispatch(changeLanguage(language))
        return {
          userState: {
            authenticated: !!user,
            user,
            fresh
          }
        }
      }

      // client side
      return getCachedProps(store)
    }

    constructor(props: TProps & PageProps) {
      super(props)
      // @ts-ignore
      this.state = {
        ready: false
      }
    }

    async componentDidMount() {
      const { dispatch, router, userState } = this.props
      const { fresh, user } = userState

      if (fresh && router.pathname !== '/register') {

        // user appears on fresh state after succesfully registered
        if (user) {
          dispatch(setFresh(false))
        } else {
          await router.replace('/register')
          return
        }
      }

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

function getCachedProps(store: Store<RootState>): PagePropsState {
  // ensure token is valid
  const token = CookieUtil.getCookie(JWT_KEY)

  const fresh = store.getState().common.fresh
  if (!token || token === '') {
    return {
      userState: {
        authenticated: false,
        user: null,
        fresh
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
      user: jwt.user,
      fresh
    }
  }
}
