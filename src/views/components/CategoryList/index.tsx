import { Button, Col, Icon, Layout, Row, Table } from 'antd'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { CategoryDto } from '../../dto/product/category'
import { withLang } from '../../lib/withLang'
import { CategoryAdd, CategoryAddCls } from '../CategoryAdd'
import messages from './locales'
import { CategoryListProps } from './props'
import { withCategoryList } from './with'

interface State {
  visible: boolean
  selectedRowKeys: string[]
}

class CategoryCls extends React.Component<CategoryListProps, State> {
  categoryEditor?: CategoryAddCls

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Action',
      width: 150,
      align: 'right',
      render: (category: CategoryDto) => (
        <Button.Group>
          <Button
            type="primary"
            onClick={() => {
              this.props.setSelectedCategory(category)
            }}
          >
            <Icon type="edit" />
          </Button>
          <Button type="danger" onClick={this.showModal}>
            <Icon type="delete" />
          </Button>
        </Button.Group>
      )
    }
  ]
  constructor(props: CategoryListProps) {
    super(props)
    this.state = { visible: false, selectedRowKeys: [] }
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  render() {
    const { categories } = this.props
    const { selectedRowKeys } = this.state

    return (
      <Layout className="inner-container">
        <Layout.Header className="header">
          <Row>
            <Col xs={4}>
              <h1>
                <FormattedMessage id="category" />
              </h1>
            </Col>
            <Col xs={20}>
              <div style={{ float: 'right' }}>
                <Button.Group>
                  <Button type="primary" onClick={this.showModal}>
                    <Icon type="plus" />
                  </Button>
                  <Button type="danger">
                    <Icon type="delete" />
                  </Button>
                  <Button>
                    <Icon type="reload" />
                  </Button>
                </Button.Group>
              </div>
            </Col>
          </Row>
        </Layout.Header>
        <Layout.Content>
          {categories && categories.length ? (
            <Table
              className="responsive"
              rowKey="id"
              rowSelection={{
                selectedRowKeys,
                onChange: (keys: string[]) => {
                  this.setState({ selectedRowKeys: keys })
                }
              }}
              columns={this.columns}
              dataSource={categories}
            />
          ) : (
            <div>Kosong</div>
          )}
          <CategoryAdd
            modalVisible={this.state.visible}
            onModalHide={() => {
              this.setState({
                visible: false
              })
            }}
          />
        </Layout.Content>
      </Layout>
    )
  }
}

export const CategoryList = withCategoryList(withLang(messages)(CategoryCls))
