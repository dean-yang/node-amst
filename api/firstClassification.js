const router = require('koa-router')()
var sql = require('../sql')
var FirstClassification = require('../sql/col/firstClassification')

router.prefix('/api/firstClassification')


// 获取
router.post('/get',async (ctx,next)=>{
    const data =  await sql.find(FirstClassification,ctx.request.body,{_id:0})
    return ctx.body = {
        code:1,
        data
    }
})


module.exports =  router