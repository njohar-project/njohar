import { Menu } from 'antd'
import Link from 'next/link'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { withLang } from '../../../../lib/withLang'
import messages from './locales'
import { AdminMenuProps } from './props'

const MenuItem = Menu.Item
const THEME = 'dark'

class AdminMenuCls extends React.PureComponent<AdminMenuProps> {
  render() {
    // tslint:disable-next-line:no-shadowed-variable
    const { router } = this.props

    return (
      <div>
        <style jsx="true">{`
          .ant-menu {
            line-height: 64px;
          }
        `}</style>
        <Menu
          mode="vertical-left"
          theme={THEME}
          style={{ float: 'left' }}
          selectable={false}
        >
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
          <MenuItem
            key="products"
            className={
              router.pathname === '/admin/products' ? 'ant-menu-item-selected' : ''
            }
          >
            <Link prefetch href="/admin/products">
              <a>
                <FormattedMessage id="products" />
              </a>
            </Link>
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

export const AdminMenu = withLang<WithRouteProps>(messages)(AdminMenuCls)
