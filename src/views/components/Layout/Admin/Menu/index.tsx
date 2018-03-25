import { Col, Icon, Menu, Row } from 'antd'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { withLang } from '../../../../lib/withLang'
import messages from './locales'
import { AdminMenuProps } from './props'

const MenuItem = Menu.Item
const THEME = 'dark'

class AdminMenuCls extends React.PureComponent<AdminMenuProps> {
  nav(key: string) {
    this.props.router.push(key)
  }

  render() {
    return (
      <Row>
        <Col>
          <style jsx="true">{`
            .ant-menu {
              line-height: 64px;
            }
          `}</style>
          <Menu
            mode="inline"
            theme={THEME}
            onSelect={({ key }) => {
              this.nav(key)
            }}
            defaultSelectedKeys={[this.props.router.pathname]}
          >
            <MenuItem key="/admin">
              <Icon type="" className="icon-home" />
              <span>
                <FormattedMessage id="home" />
              </span>
            </MenuItem>
            <MenuItem key="/admin/products">
              <Icon type="" className="icon-box" />
              <span>
                <FormattedMessage id="products" />
              </span>
            </MenuItem>
          </Menu>
        </Col>
      </Row>
    )
  }
}

export const AdminMenu = withLang<WithRouteProps>(messages)(AdminMenuCls)
