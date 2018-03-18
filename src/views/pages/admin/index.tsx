import Router from 'next/router'
import * as React from 'react'
import { PageLayout } from '../../components/Layout'
import { Page } from '../_page'

export default class AdminPage extends Page {
  componentDidMount() {
    if (!this.props.userState.authenticated) {
      Router.replace('/')
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
