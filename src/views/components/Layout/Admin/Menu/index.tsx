import { Col, Icon, Menu, Row } from 'antd'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { withLang } from '../../../../lib/withLang'
import messages from './locales'
import { AdminMenuProps } from './props'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu
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
              <Icon type="njohar" className="icon-dashboard" />
              <FormattedMessage id="home" />
            </MenuItem>

            <SubMenu
              title={
                <span>
                  <Icon type="njohar" className="icon-i-catalog" />
                  <FormattedMessage id="catalog" />
                </span>
              }
            >
              <MenuItem key="/admin/catalog/categories">
                <Icon type="njohar" className="icon-category" />
                <FormattedMessage id="categories" />
              </MenuItem>
              <MenuItem key="/admin/catalog/products">
                <Icon type="njohar" className="icon-box" />
                <FormattedMessage id="products" />
              </MenuItem>
            </SubMenu>

            <SubMenu
              title={
                <span>
                  <Icon type="njohar" className="icon-jiesuanqingdan" />
                  <FormattedMessage id="transactions" />
                </span>
              }
            >
              <MenuItem key="/admin/transactions">
                <Icon type="njohar" className="icon-cart" />
                <FormattedMessage id="transactions" />
              </MenuItem>
              <MenuItem key="/admin/reports">
                <Icon type="njohar" className="icon-report" />
                <FormattedMessage id="reports" />
              </MenuItem>
            </SubMenu>

            <MenuItem key="/admin/customers">
              <Icon type="njohar" className="icon-customer" />
              <FormattedMessage id="customers" />
            </MenuItem>

            <MenuItem key="/admin/settings">
              <Icon type="njohar" className="icon-setting" />
              <FormattedMessage id="settings" />
            </MenuItem>

          </Menu>
        </Col>
      </Row>
    )
  }
}

export const AdminMenu = withLang<WithRouteProps>(messages)(AdminMenuCls)
