const router = require('koa-router')()
var sql = require('../sql')
var SecondClassification = require('../sql/col/secondClassification')

router.prefix('/api/secondClassification')

// 获取
router.post('/get',async (ctx,next)=>{
    const {
        first_classification_id
    } = ctx.request.body 
    const data =  await sql.find(SecondClassification,{first_classification_id},{_id:0})
    return ctx.body = {
        code:1,
        data
    }
})


module.exports =  router