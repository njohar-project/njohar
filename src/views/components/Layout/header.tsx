import { Layout } from 'antd'
import { withRouter } from 'next/router'
import * as React from 'react'

export const PageHeader = withRouter(props => {
  const { router, children } = props

  if (!router) {
    throw new Error('Router not defined.')
  }

  return (
    <Layout.Header>
      {children}
    </Layout.Header>
  )
})
