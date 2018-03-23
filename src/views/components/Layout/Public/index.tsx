import { Layout, LocaleProvider } from 'antd'
import { Locale } from 'antd/lib/locale-provider'
import Head from 'next/head'
import { withRouter } from 'next/router'
import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../../store'
import '../../../style/index.less'
import { PageContent } from '../content'
import { PageFooter } from '../footer'
import { PageHeader } from '../header'
import { PageMenu } from './Menu'

export interface LayoutProps {
  title?: string
  locale?: Locale
}

class PublicPageLayoutCls extends React.Component<
  LayoutProps & WithRouteProps
> {
  render() {
    const { locale } = this.props
    if (!locale) {
      throw new Error('Localization required')
    }

    return (
      <LocaleProvider locale={locale}>
        <Layout>
          <Head>
            <link rel="shortcut icon" href="/static/img/favicon.ico" />
            <title>{this.props.title}</title>
          </Head>
          <PageHeader>
            <PageMenu {...this.props} />
          </PageHeader>
          <PageContent>{this.props.children}</PageContent>
          <PageFooter />
        </Layout>
      </LocaleProvider>
    )
  }
}

export const PublicPageLayout = withRouter(
  connect<LayoutProps, null, LayoutProps>((state: RootState) => ({
    locale: state.common.locale
  }))(PublicPageLayoutCls)
)
