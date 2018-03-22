import Router from 'next/router'
import * as React from 'react'
import { PageLayout } from '../../components/Layout'
import { PageProps, wrap } from '../../lib/wrapper'

class AdminPage extends React.Component<PageProps> {
  async componentDidMount() {
    if (!this.props.userState.authenticated) {
      await Router.replace('/')
    }
  }

  render() {
    return (
      <PageLayout title="Admin Page">
        <h1>Admin</h1>
      </PageLayout>
    )
  }

}

export default wrap(AdminPage)
