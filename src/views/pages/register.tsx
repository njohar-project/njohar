import * as React from 'react'
import { PageLayout } from '../components/Layout'
import { Register } from '../components/Register'
import { PageProps, wrap } from '../lib/wrapper'

class RegisterPage extends React.Component<PageProps> {
  render() {
    return (
      <PageLayout title="Home">
        <Register />
      </PageLayout>
    )
  }
}

export default wrap(RegisterPage)
