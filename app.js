const koa = require('koa')
const koaRouter = require('./api/routes/user.route.js')
const bodyParser = require('koa-body')
const dbConnection = require('./configs/db.config.js')

const port = process.env.PORT || 3000
dbConnection()

const router = koaRouter()
const app = new koa()

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})