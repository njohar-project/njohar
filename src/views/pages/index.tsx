import * as React from 'react'
import { PageLayout } from '../components/Layout'
import { PageProps, wrap } from '../lib/wrapper'

class App extends React.Component<PageProps> {
  render() {
    return (
      <PageLayout title="Home">
        Hey!
      </PageLayout>
    )
  }
}

export default wrap(App)
