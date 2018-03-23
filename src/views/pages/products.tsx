import * as React from 'react'
import { PageLayout } from '../components/Layout'
import { ProductTopTen } from '../components/Product/TopTen'
import { wrap } from '../lib/wrapper'

class ProductPage extends React.Component {
  render() {
    return (
      <PageLayout title="Products">
        <ProductTopTen />
      </PageLayout>
    )
  }
}

export default wrap(ProductPage)
