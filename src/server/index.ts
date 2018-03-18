import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as mount from 'koa-mount'
import * as serve from 'koa-static'
import * as nextjs from 'next'
import { resolve } from 'path'
import { LANG_KEY } from '../lib/constants'
import { DataAccess } from './dataAccess'
import gql from './gql'
import { appSettings, authenticate, framework } from './middleware'

const DEBUG_MODE: boolean = process.env.NODE_ENV === 'development'

const host = process.env.BASE_URL || '-'
const port = parseInt(process.env.PORT || '', 10) || 80
const dir = DEBUG_MODE ? resolve(__dirname, '../views') : process.cwd()
const app = nextjs({ dev: DEBUG_MODE, dir })
const handle = app.getRequestHandler()

app.prepare().then(async () => {
  const server = new Koa()

  await DataAccess.connect()

  server

    .use(framework)
    .use(appSettings)
    .use(authenticate)
    .use(bodyParser())
    .use(gql.routes())

    // https://github.com/zeit/next-plugins/issues/56
    .use(
      mount('/_next/static', serve(resolve(__dirname, '../views/.next/static')))
    )

    .use(async (ctx, next) => {
      await next()

      ctx.req.serverState = ctx.getClientInitialState()
      await handle(ctx.req, ctx.res)
      ctx.respond = false
    })

    // always return OK as fallback
    // requested by nextjs
    .use(async (ctx, next) => {
      ctx.res.statusCode = 200
      await next()
    })

    .listen(port, (err?: Error) => {
      if (err) {
        throw err
      }

      // tslint:disable-next-line:no-console
      console.log(`> Ready on ${host}:${port}`)
    })
})
