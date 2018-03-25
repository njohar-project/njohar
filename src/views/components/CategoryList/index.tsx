import { Button, Divider, Table } from 'antd'
import * as React from 'react'
import { CategoryDto } from '../../dto/product/category'
import { CategoryAdd, CategoryAddCls } from '../CategoryAdd'
import { CategoryListProps } from './props'
import { withCategoryList } from './with'

interface State {
  visible: boolean
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
      dataIndex: '_id',
      key: '_id',
      render: (_id: string, category: CategoryDto) => (
        <span>
          <Button
            type="primary"
            onClick={() => this.props.setSelectedCategory(category)}
          >
            Edit
          </Button>
          <Divider type="vertical" />
        </span>
      )
    }
  ]
  constructor(props: CategoryListProps) {
    super(props)
    this.state = { visible: false }
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  render() {
    const { categories } = this.props

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Add Category
        </Button>
        {categories && categories.length ? (
          <Table columns={this.columns} dataSource={categories} />
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
      </div>
    )
  }
}

export const CategoryList = withCategoryList(CategoryCls)
