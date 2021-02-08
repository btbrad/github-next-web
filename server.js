const Koa = require('koa')
const next = require('next')
const KoaRouter = require('koa-router')

const router = new KoaRouter()
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa()
  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(router.routes())

  server.listen(3000, () => {
    console.log('Koa server is running at 3000')
  })
})
