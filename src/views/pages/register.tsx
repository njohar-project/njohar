import * as React from 'react'
import { PublicPageLayout } from '../components/Layout'
import { Register } from '../components/Register'
import { PageProps, wrap } from '../lib/wrapper'

class RegisterPage extends React.Component<PageProps> {
  render() {
    return (
      <PublicPageLayout title="Home">
        <Register />
      </PublicPageLayout>
    )
  }
}

export default wrap(RegisterPage)
