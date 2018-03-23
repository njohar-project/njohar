import * as React from 'react'
import { PublicPageLayout } from '../components/Layout'
import { ProductTopTen } from '../components/Product/TopTen'
import { wrap } from '../lib/wrapper'

class ProductPage extends React.Component {
  render() {
    return (
      <PublicPageLayout title="Home">
        <ProductTopTen />
      </PublicPageLayout>
    )
  }
}

export default wrap(ProductPage)
