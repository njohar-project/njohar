import gql from 'graphql-tag'
import * as React from 'react'
import { ChildProps, graphql, QueryProps } from 'react-apollo'
import { ProductDto } from '../../dto/product/product'

const PRODUCT_TOP_TEN_QUERY = gql`
  query {
    topTenProducts {
      id
      name
      thumb
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

function TopTen(props: Props) {
  const { topTenProducts } = props
  return (
    <section>
      <div>{topTenProducts && topTenProducts.map(p => <div key={p.id}>{p.name}</div>)}</div>
    </section>
  )
  // if (topTenProducts && topTenProducts.length) {
  //   return <div>{topTenProducts.map(p => <div key={p.id}>{p.name}</div>)}</div>
  // }

  // return <div>Kosong</div>
}

class ProductTopTenCls extends React.Component<Props> {
  render() {
    const { topTenProducts } = this.props
    if (topTenProducts && topTenProducts.length) {
      return (
        <div>{topTenProducts.map(p => <div key={p.id}>{p.name}</div>)}</div>
      )
    }

    return <div>Kosong</div>
  }
}

export const ProductTopTen = withProductTopTen(TopTen)
