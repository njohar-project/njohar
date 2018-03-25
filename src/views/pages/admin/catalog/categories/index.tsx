import * as React from 'react'
import { AdminPageLayout } from '../../../../components/Layout'
import { withLang } from '../../../../lib/withLang'
import { PageProps, wrap } from '../../../../lib/wrapper'

class AdminPage extends React.Component<PageProps & WithLangProps> {
  render() {
    return (
      <AdminPageLayout
        title={this.props.intl.formatMessage({ id: 'title' })}
        {...this.props}
      >
        <h1>Admin Category Product</h1>
      </AdminPageLayout>
    )
  }
}

const messages = {
  'en-US': {
    title: 'Categories'
  },
  'id-ID': {
    title: 'Kategori'
  }
}

export default wrap(withLang(messages)(AdminPage))
