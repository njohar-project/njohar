import * as React from 'react'
import { PageLayout } from '../components/Layout'
import { Register } from '../components/Register'
import { wrap } from '../lib/wrapper'
import { Page } from './_page'

class RegisterPage extends Page {
  render() {
    return (
      <PageLayout title="Home">
        <Register />
      </PageLayout>
    )
  }
}

export default wrap(RegisterPage)
