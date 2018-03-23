import * as React from 'react'
import { PublicPageLayout } from '../components/Layout'
import { PageProps, wrap } from '../lib/wrapper'

class App extends React.Component<PageProps> {
  render() {
    return (
      <PublicPageLayout title="Home">
        Hey!
      </PublicPageLayout>
    )
  }
}

export default wrap(App)
