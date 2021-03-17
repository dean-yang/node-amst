const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa-cors')
const koaBody = require('koa-body');
const path = require("path")


const index = require('./routes/index')
const users = require('./routes/users')
/**
 * admin
 */
const loginAdmin = require('./admin/login')
const firstClassificationAdmin = require('./admin/firstClassification')
const secondClassificationAdmin = require('./admin/secondClassification')
const carefullyChosenAdmin = require('./admin/carefullyChosen')
const bannerAdmin = require('./admin/banner')

/**
 * api
 */
const firstClassificationApi = require('./api/firstClassification')
const secondClassificationApi = require('./api/secondClassification')
const bannerApi = require('./api/banner')



const uploadIma = require('./admin/uploaImg')



app.use(cors({
  origin:"*",
  credentials:true //证书
}))
app.use(koaBody({
  multipart: true,
  formidable: {
      maxFileSize: 200*1024*1024,    // 设置上传文件大小最大限制，默认2M
}
}));


// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public/images'))


app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())


/**
 * admin
 */
app.use(uploadIma.routes(), uploadIma.allowedMethods())
app.use(loginAdmin.routes(),loginAdmin.allowedMethods())
app.use(firstClassificationAdmin.routes(),firstClassificationAdmin.allowedMethods())
app.use(secondClassificationAdmin.routes(),secondClassificationAdmin.allowedMethods())
app.use(bannerAdmin.routes(),bannerAdmin.allowedMethods())
app.use(carefullyChosenAdmin.routes(), carefullyChosenAdmin.allowedMethods())

/**
 * api
 */
 app.use(firstClassificationApi.routes(),firstClassificationApi.allowedMethods())
 app.use(secondClassificationApi.routes(),secondClassificationApi.allowedMethods())
 app.use(bannerApi.routes(),bannerApi.allowedMethods())





// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
