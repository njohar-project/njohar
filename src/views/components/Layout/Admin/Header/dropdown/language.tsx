import { Dropdown, Icon, Menu } from 'antd'
import * as React from 'react'

const MenuItem = Menu.Item

export interface LanguageDropdownProps {
  onChangeLanguage(language: string): void
}

export class LanguageDropdown extends React.PureComponent<
  LanguageDropdownProps
> {
  render() {
    const { onChangeLanguage } = this.props
    const content = (
      <Menu className="admin-header-dropdown">
        <MenuItem>
          <a onClick={() => onChangeLanguage('en-US')}>English</a>
        </MenuItem>
        <MenuItem>
          <a onClick={() => onChangeLanguage('id-ID')}>Bahasa Indonesia</a>
        </MenuItem>
      </Menu>
    )

    return (
      <Dropdown overlay={content}>
        <a className="ant-dropdown-link">
          <Icon type="njohar" className="icon-language" />
        </a>
      </Dropdown>
    )
  }
}
