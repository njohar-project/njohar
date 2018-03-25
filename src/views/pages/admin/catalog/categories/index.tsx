import * as React from 'react'
import { CategoryList } from '../../../../components/CategoryList'
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
        <CategoryList />
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
