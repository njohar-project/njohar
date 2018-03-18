import { Menu, Popover } from 'antd'
import Link from 'next/link'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withLang } from '../../../lib/withLang'
import { RootState } from '../../../store'
import { changeLanguage } from '../../../store/common/actions'
import { logout } from '../../../store/user/actions'
import { Login } from '../../Login'
import messages from './locales'
import { PageMenuActionProps, PageMenuProps, PageMenuStateProps } from './props'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

const LoginComponent = (
  <div>
    <p>Login Component Here</p>
    <Login />
  </div>
)

const THEME = 'dark'

class PageMenuCls extends React.PureComponent<PageMenuProps> {
  render() {
    // tslint:disable-next-line:no-shadowed-variable
    const { router, user, authenticated, logout, changeLanguage } = this.props
    return (
      <div>
        <style jsx="true">{`
          .ant-menu {
            line-height: 64px;
          }
        `}</style>
        <Menu
          mode="horizontal"
          theme={THEME}
          style={{ float: 'left' }}
          selectable={false}
        >
          <SubMenu title={<FormattedMessage id="language" />}>
            <MenuItem>
              <a onClick={() => changeLanguage('en-US')}> English</a>
            </MenuItem>
            <MenuItem>
              <a onClick={() => changeLanguage('id-ID')}>Bahasa Indonesia</a>
            </MenuItem>
          </SubMenu>
          <MenuItem
            key="home"
            className={router.pathname === '/' ? 'ant-menu-item-selected' : ''}
          >
            <Link prefetch href="/">
              <a>
                <FormattedMessage id="home" />
              </a>
            </Link>
          </MenuItem>
          <MenuItem
            key="products"
            className={
              router.pathname === '/products' ? 'ant-menu-item-selected' : ''
            }
          >
            <Link prefetch href="/products">
              <a>
                <FormattedMessage id="products" />
              </a>
            </Link>
          </MenuItem>
        </Menu>
        <div style={{ float: 'right' }}>
          {authenticated && user ? (
            <Menu mode="horizontal" theme={THEME} selectable={false}>
              <MenuItem>
                <strong>{user.name}</strong>
              </MenuItem>
              <MenuItem>
                <a
                  onClick={() => {
                    logout()
                    router.replace('/')
                  }}
                >
                  <FormattedMessage id="logout" />
                </a>
              </MenuItem>
            </Menu>
          ) : (
            <Menu mode="horizontal" theme={THEME} selectable={false}>
              <MenuItem>
                <Popover
                  content={LoginComponent}
                  placement="bottomRight"
                  trigger="click"
                  title="Login"
                >
                  <a>
                    <FormattedMessage id="login" />
                  </a>
                </Popover>
              </MenuItem>
              <MenuItem
                key="register"
                className={
                  router.pathname === '/register'
                    ? 'ant-menu-item-selected'
                    : ''
                }
              >
                <Link prefetch href="/register">
                  <a>
                    <FormattedMessage id="register" />
                  </a>
                </Link>
              </MenuItem>
            </Menu>
          )}
        </div>
      </div>
    )
  }
}

export const PageMenu = withLang<WithRouteProps>(messages)(
  connect<PageMenuStateProps, PageMenuActionProps>(
    (state: RootState) => ({
      user: state.users.user,
      authenticated: state.users.authenticated
    }),
    dispatch => ({
      logout: bindActionCreators(logout, dispatch),
      changeLanguage: bindActionCreators(changeLanguage, dispatch)
    })
  )(PageMenuCls)
)
