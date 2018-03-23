import * as React from 'react'
import { PublicPageLayout } from '../components/Layout'
import { ProductTopTen } from '../components/Product/TopTen'
import { PageProps, wrap } from '../lib/wrapper'

class ProductPage extends React.Component<PageProps> {
  render() {
    return (
      <PublicPageLayout title="Products" {...this.props}>
        <ProductTopTen />
      </PublicPageLayout>
    )
  }
}

export default wrap(ProductPage)
