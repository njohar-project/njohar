import { Form, Icon, Input, Modal } from 'antd'
import * as React from 'react'
import { withLang } from '../../lib/withLang'
import messages from './locales'
import { CategoryAddOwnProps, CategoryAddProps } from './props'
import { withCategory } from './with'

const FormItem = Form.Item
interface State {
  visible: boolean
}

export class CategoryAddCls extends React.Component<CategoryAddProps, State> {
  constructor(props: CategoryAddProps) {
    super(props)
    this.state = {
      visible: false
    }
  }

  componentWillReceiveProps(nextProps: CategoryAddOwnProps) {
    if (nextProps.modalVisible !== this.props.modalVisible) {
      this.setState({ visible: nextProps.modalVisible })
    }
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  handleOk = () => {
    const { error, addCategory, form } = this.props
    form.validateFields(async (err, values) => {
      if (!err) {
        try {
          const { name } = values
          await addCategory({
            name
          })
        } catch (err) {
          error(err)
        }
      }
    })

    this.setState({
      visible: false
    })
    this.props.onModalHide()
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
    this.props.onModalHide()
  }

  render() {
    const { intl, form } = this.props
    const { getFieldDecorator } = form
    return (
      <Modal
        title="Add Category"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText="Save"
      >
        <Form className="category-form">
          <FormItem>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: intl.formatMessage({ id: 'nameIsRequired' })
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder={intl.formatMessage({ id: 'namePlaceholder' })}
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export const CategoryAdd = withLang<CategoryAddOwnProps>(messages)(
  withCategory(Form.create<CategoryAddProps>()(CategoryAddCls))
)
