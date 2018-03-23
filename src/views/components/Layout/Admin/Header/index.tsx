import { Menu } from 'antd'
import Link from 'next/link'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withLang } from '../../../../lib/withLang'
import { RootState } from '../../../../store'
import { changeLanguage } from '../../../../store/common/actions'
import { logout } from '../../../../store/user/actions'
import messages from './locales'
import { AdminHeaderActionProps, AdminHeaderProps, AdminHeaderStateProps } from './props'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu
const THEME = 'dark'

class AdminHeaderCls extends React.PureComponent<AdminHeaderProps> {
  render() {
    // tslint:disable-next-line:no-shadowed-variable
    const { router, user, logout, changeLanguage } = this.props

    if (!user) {
      return null;
    }

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
            className={router.pathname === '/admin' ? 'ant-menu-item-selected' : ''}
          >
            <Link prefetch href="/admin">
              <a>
                <FormattedMessage id="home" />
              </a>
            </Link>
          </MenuItem>
        </Menu>
        <div style={{ float: 'right' }}>
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
        </div>
      </div>
    )
  }
}

export const AdminHeader = withLang<WithRouteProps>(messages)(
  connect<AdminHeaderStateProps, AdminHeaderActionProps>(
    (state: RootState) => ({
      user: state.users.user,
      authenticated: state.users.authenticated
    }),
    dispatch => ({
      logout: bindActionCreators(logout, dispatch),
      changeLanguage: bindActionCreators(changeLanguage, dispatch)
    })
  )(AdminHeaderCls)
)
