// tslint:disable:no-shadowed-variable
import { Breadcrumb, Col, Icon, Row } from 'antd'
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withLang } from '../../../../lib/withLang'
import { RootState } from '../../../../store'
import { changeLanguage } from '../../../../store/common/actions'
import { logout } from '../../../../store/user/actions'
import { LanguageDropdown } from './dropdown/language'
import { ProfileDropdown } from './dropdown/profile'
import messages from './locales'
import {
  AdminHeaderActionProps,
  AdminHeaderOwnProps,
  AdminHeaderProps,
  AdminHeaderStateProps
} from './props'

import './style.less'

class AdminHeaderCls extends React.PureComponent<AdminHeaderProps> {
  render() {
    const {
      sidebarCollapsed,
      user,
      logout,
      router,
      changeLanguage
    } = this.props

    if (!user) {
      return null
    }

    const menuSize = sidebarCollapsed ? 16 : 0

    return (
      <Row className="admin-header">
        <Col xs={8} sm={8} md={2} lg={2} xl={2} xxl={2}>
          <Icon
            className={
              'trigger icon-' + (sidebarCollapsed ? 'menu-unfold' : 'menu-fold')
            }
            type=""
            onClick={this.props.onCollapse}
            style={{ float: 'left' }}
          />
        </Col>
        <Col xs={menuSize} sm={menuSize} md={22} lg={22} xl={22} xxl={22}>
          <div style={{ float: 'right' }}>
            <Breadcrumb className="breadcrumb" separator="&nbsp;&nbsp;&nbsp;">
              <Breadcrumb.Item>
                <LanguageDropdown onChangeLanguage={changeLanguage} />
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <ProfileDropdown
                  user={user}
                  onLogout={() => {
                    logout()
                    router.replace('/')
                  }}
                />
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </Col>
      </Row>
    )
  }
}

export const AdminHeader = withLang<AdminHeaderOwnProps>(messages)(
  connect<AdminHeaderStateProps, AdminHeaderActionProps, AdminHeaderOwnProps>(
    (state: RootState) => ({
      user: state.users.user,
      authenticated: state.users.authenticated,
      sidebarCollapsed: state.common.adminSidebarCollapsed
    }),
    dispatch => ({
      logout: bindActionCreators(logout, dispatch),
      changeLanguage: bindActionCreators(changeLanguage, dispatch)
    })
  )(AdminHeaderCls)
)
