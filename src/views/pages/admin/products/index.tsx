import * as React from 'react'
import { AdminPageLayout } from '../../../components/Layout'
import { PageProps, wrap } from '../../../lib/wrapper'

class AdminPage extends React.Component<PageProps> {
  render() {
    return (
      <AdminPageLayout title="Products" {...this.props}>
        <h1>Admin Product</h1>
      </AdminPageLayout>
    )
  }
}

export default wrap(AdminPage)
