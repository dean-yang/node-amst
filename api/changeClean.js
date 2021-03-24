const router = require('koa-router')()
var sql = require('../sql')
var ChangeSeasonClean = require('../sql/col/changeSeasonClean')

router.prefix('/api/changeSeasonClean')


// 获取
router.post('/get', async (ctx,next) => {
    const data = await sql.find(ChangeSeasonClean,{},{_id:0})
    return ctx.body = {
        code:1,
        data
    }
})




module.exports =  router