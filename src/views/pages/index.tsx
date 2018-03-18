import * as React from 'react'
import { PageLayout } from '../components/Layout'
import { wrap } from '../lib/wrapper'
import { Page } from './_page'

class App extends Page {
  render() {
    return (
      <PageLayout title="Home">
        Hey!
      </PageLayout>
    )
  }
}

export default wrap(App)
