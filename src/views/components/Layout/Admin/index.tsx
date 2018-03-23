import { Layout, LocaleProvider } from 'antd'
import { Locale } from 'antd/lib/locale-provider'
import Head from 'next/head'
import * as React from 'react'
import { connect } from 'react-redux'
import { PageProps } from '../../../lib/wrapper'
import { RootState } from '../../../store'
import '../../../style/index.less'
import { PageContent } from '../content'
import { PageFooter } from '../footer'
import { PageHeader } from '../header'
import { AdminHeader } from './Header'
import { AdminMenu } from './Menu'

export interface LayoutProps {
  title?: string
  locale?: Locale
}

const Sider = Layout.Sider

class AdminPageLayoutCls extends React.Component<LayoutProps & PageProps> {
  async componentDidMount() {
    if (!this.props.userState.authenticated) {
      await this.props.router.replace('/')
    }
  }

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
            <AdminHeader {...this.props} />
          </PageHeader>
          <Layout>
            <Sider>
              <AdminMenu {...this.props} />
            </Sider>
            <PageContent>{this.props.children}</PageContent>
          </Layout>
          <PageFooter />
        </Layout>
      </LocaleProvider>
    )
  }
}

export const AdminPageLayout = connect<LayoutProps, null, LayoutProps>(
  (state: RootState) => ({
    locale: state.common.locale
  })
)(AdminPageLayoutCls)
