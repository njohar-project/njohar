import { Avatar, Dropdown, Icon, Menu } from 'antd'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { UserDto } from '../../../../../dto/user/user'

const MenuItem = Menu.Item

export interface ProfileDropdownProps {
  user: UserDto
  onLogout(): void
}

export class ProfileDropdown extends React.PureComponent<ProfileDropdownProps> {
  render() {
    const { user, onLogout } = this.props

    if (!user) {
      return null
    }

    const menuHandler = (key: string) => {
      switch (key) {
        default:
          return

        case 'logout':
          onLogout()
          break
      }
    }

    const menu = (
      <Menu
        className="admin-header-dropdown"
        onClick={({ key }) => menuHandler(key)}
      >
        <MenuItem>
          <Icon type="" className="icon-account" />
          <strong>{user.name}</strong>
        </MenuItem>
        <MenuItem key="logout">
          <Icon type="" className="icon-logout" />
          <FormattedMessage id="logout" />
        </MenuItem>
      </Menu>
    )

    return (
      <Dropdown overlay={menu}>
        <Avatar>{user.name[0].toUpperCase()}</Avatar>
      </Dropdown>
    )
  }
}
