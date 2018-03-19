import { Button } from 'antd'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { withLang } from '../../lib/withLang'
import { LoginProps } from './props'
import { withLogin } from './with'

import messages from './locales'

class LoginCls extends React.Component<LoginProps> {
  render() {
    const { error, login } = this.props

    return (
      <div>
        <Button
          onClick={async () => {
            try {
              await login({
                username: 'sponge1',
                password: 'bob'
              })
            } catch (err) {
              // https://stackoverflow.com/a/46378573/1586914
              // https://github.com/apollographql/apollo-client/issues/1692
              // https://github.com/apollographql/apollo-client/issues/1496
              error(err)
            }
          }}
        >
          <FormattedMessage id="login" />
        </Button>
      </div>
    )
  }
}

export const Login = withLang(messages)(withLogin(LoginCls))
