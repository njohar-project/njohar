import { Layout, LocaleProvider } from 'antd'
import { Locale } from 'antd/lib/locale-provider'
import Head from 'next/head'
import * as React from 'react'
import { connect } from 'react-redux'
import { PageProps } from '../../../lib/wrapper'
import { RootState } from '../../../store'
import { setAdminSidebarCollapse } from '../../../store/common/actions'
import { PageContent } from '../content'
import { PageFooter } from '../footer'
import { PageHeader } from '../header'
import { AdminHeader } from './Header'
import { AdminMenu } from './Menu'

import '../../../style/index.less'
import './style.less'

export interface LayoutProps {
  title?: string
  locale?: Locale
  sidebarCollapsed?: boolean
}

const Sider = Layout.Sider

class AdminPageLayoutCls extends React.Component<LayoutProps & PageProps> {
  constructor(props: LayoutProps & PageProps) {
    super(props)
  }

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
        <Layout className="admin-layout" hasSider>
          <Head>
            <link rel="shortcut icon" href="/static/img/favicon.ico" />
            <title>{this.props.title}</title>
          </Head>
          <Sider
            breakpoint="lg"
            collapsible
            trigger={null}
            collapsed={this.props.sidebarCollapsed}
            onCollapse={(collapsed, type) => {
              if (type === 'responsive') {
                this.props.dispatch(setAdminSidebarCollapse(collapsed))
              }
            }}
          >
            <div className="logo">
              <img src="/static/img/logo-32.png" />
              <h1>Njohar</h1>
            </div>
            <AdminMenu {...this.props} />
          </Sider>
          <Layout>
            <PageHeader className="header-container">
              <AdminHeader
                {...this.props}
                onCollapse={() => {
                  this.props.dispatch(
                    setAdminSidebarCollapse(!this.props.sidebarCollapsed)
                  )
                }}
              />
            </PageHeader>
            <PageContent className="main-container">
              {this.props.children}
            </PageContent>
            <PageFooter />
          </Layout>
        </Layout>
      </LocaleProvider>
    )
  }
}

export const AdminPageLayout = connect<LayoutProps, null, LayoutProps>(
  (state: RootState) => ({
    locale: state.common.locale,
    sidebarCollapsed: state.common.adminSidebarCollapsed
  })
)(AdminPageLayoutCls)
