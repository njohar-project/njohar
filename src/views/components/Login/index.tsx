import { Button, Form, Icon, Input } from 'antd'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { withLang } from '../../lib/withLang'
import messages from './locales'
import { LoginProps } from './props'
import { withLogin } from './with'

const FormItem = Form.Item

class LoginCls extends React.Component<LoginProps> {
  constructor(props: LoginProps) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e: React.FormEvent<{}>) {
    e.preventDefault()
    const { error, login, form } = this.props
    form.validateFields(async (err, values) => {
      if (!err) {
        try {
          const { email, password } = values
          await login({
            email,
            password
          })
        } catch (err) {
          error(err)
        }
      }
    })
  }
  render() {
    const { intl, form } = this.props
    const { getFieldDecorator } = form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: intl.formatMessage({ id: 'emailIsRequired' })
              },
              {
                message: 'Format Email Salah',
                type: 'email'
              }
            ]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={intl.formatMessage({ id: 'emailPlaceholder' })}
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: intl.formatMessage({ id: 'passwordIsRequired' })
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder={intl.formatMessage({ id: 'passwordPlaceholder' })}
            />
          )}
        </FormItem>
        <FormItem>
          <a className="login-form-forgot" href="">
            <FormattedMessage id="forget" />
          </a>
          <br />
          <style jsx="true">{`
            .submit {
              width: 100%;
            }
          `}</style>
          <Button type="primary" htmlType="submit" className="submit">
            <FormattedMessage id="login" />
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export const Login = withLang(messages)(
  withLogin(Form.create<LoginProps>()(LoginCls))
)
