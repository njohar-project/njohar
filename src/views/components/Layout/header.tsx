import { Layout } from 'antd'
import { withRouter } from 'next/router'
import * as React from 'react'
import { PageMenu } from './Menu/index'

export const PageHeader = withRouter(props => {
  const { router, children } = props

  if (!router) {
    throw new Error('Router not defined.')
  }

  return (
    <Layout.Header>
      <PageMenu router={router} /> {children}
    </Layout.Header>
  )
})
