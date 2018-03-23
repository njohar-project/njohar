import { Avatar, Card, Col, Row } from 'antd'
import gql from 'graphql-tag'
import * as React from 'react'
import { ChildProps, graphql, QueryProps } from 'react-apollo'
import { ProductDto } from '../../dto/product/product'
const { Meta } = Card

const PRODUCT_TOP_TEN_QUERY = gql`
  query {
    topTenProducts {
      id
      name
      thumb
      price
      createdAt
      updatedAt
    }
  }
`

interface Response {
  topTenProducts?: ProductDto[]
}

type Props = Response & QueryProps

const withProductTopTen = graphql<Response, {}, Props>(PRODUCT_TOP_TEN_QUERY, {
  props: ({ data }) => ({ ...data })
})

class ProductTopTenCls extends React.Component<Props> {
  render() {
    const { topTenProducts } = this.props
    if (topTenProducts && topTenProducts.length) {
      return (
        <Row>
          {topTenProducts.map(p => (
            <Col md={3} style={{ padding: '10px' }}>
              <Card cover={<img alt={p.name} src={p.thumb} />}>
                <Meta title={p.name} description={p.price} />
              </Card>
            </Col>
          ))}
        </Row>
      )
    }

    return <div>Kosong</div>
  }
}

export const ProductTopTen = withProductTopTen(ProductTopTenCls)
