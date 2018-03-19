import { Button } from 'antd'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { withLang } from '../../lib/withLang'
import { RegisterProps } from './props'
import { withRegister } from './with'

import messages from './locales'

class RegisterCls extends React.Component<RegisterProps> {
  render() {
    const { error, register } = this.props

    return (
      <div>
        <Button
          onClick={async () => {
            try {
              await register({
                name: 'Sponge Bob',
                username: 'sponge',
                password: 'bob',
                roles: ['customer']
              })
            } catch (err) {
              error(err)
            }
          }}
        >
          <FormattedMessage id="register" />
        </Button>
      </div>
    )
  }
}

export const Register = withLang(messages)(withRegister(RegisterCls))
