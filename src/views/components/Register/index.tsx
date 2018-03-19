import { Button, Card, Col, Form, Icon, Input, Row } from 'antd'
import Router from 'next/router'
import * as React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withLang } from '../../lib/withLang'
import messages from './locales'
import { RegisterProps } from './props'
import { withRegister } from './with'

const FormItem = Form.Item

class RegisterCls extends React.Component<RegisterProps> {
  constructor(props: RegisterProps) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      busy: false,
      error: undefined,
      found: false,
      result: undefined
    }
  }
  handleSubmit(e: React.FormEvent<{}>) {
    e.preventDefault()
    const { error, register, form } = this.props
    form.validateFields(async (err, values) => {
      if (!err) {
        try {
          const { name, email, password } = values
          await register({
            name,
            email,
            password,
            roles: ['customer']
          })
          await Router.replace('/')
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
      <Row>
        <Col
          span={12}
          xs={4}
          sm={6}
          md={8}
          lg={12}
          offset={6}
          style={{ paddingTop: 100 }}
        >
          <Card
            title={intl.formatMessage({ id: 'register' })}
            style={{
              display: 'block'
            }}
          >
            <Form onSubmit={this.handleSubmit} className="register-form">
              <FormItem>
                {getFieldDecorator('name', {
                  rules: [
                    {
                      message: intl.formatMessage({ id: 'nameIsRequired' }),
                      required: true
                    }
                  ]
                })(
                  <Input
                    size="large"
                    placeholder={intl.formatMessage({ id: 'namePlaceholder' })}
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('email', {
                  rules: [
                    {
                      message: intl.formatMessage({ id: 'emailIsRequired' }),
                      required: true
                    },
                    {
                      message: 'Format Email Salah',
                      type: 'email'
                    }
                  ]
                })(
                  <Input
                    size="large"
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
                    prefix={
                      <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type="password"
                    placeholder={intl.formatMessage({ id: 'passwordPlaceholder' })}
                  />
                )}
              </FormItem>
              <FormItem>
                <style jsx="true">{`
                  .submit {
                    width: 100%;
                  }
                `}</style>
                <Button type="primary" htmlType="submit" className="submit">
                  <FormattedMessage id="register" />
                </Button>
              </FormItem>
            </Form>
          </Card>
        </Col>
      </Row>
      // <div>
      //   <Button
      //     onClick={async () => {
      //       try {
      //         await register({
      //           name: 'Sponge Bob',
      //           username: 'sponge',
      //           password: 'bob',
      //           roles: ['customer']
      //         })
      //       } catch (err) {
      //         error(err)
      //       }
      //     }}
      //   >
      //     <FormattedMessage id="register" />
      //   </Button>
      // </div>
    )
  }
}

export const Register = withLang(messages)(
  withRegister(Form.create<RegisterProps>()(injectIntl(RegisterCls)))
)
