const router = require('koa-router')()
var sql = require('../sql')
var CarefullyChosen = require('../sql/col/carefullyChosen')

router.prefix('/api/carefullyChosen')


// 获取
router.post('/get', async (ctx,next) => {
    const data = await sql.find(CarefullyChosen,{},{_id:0})
    return ctx.body = {
        code:1,
        data
    }
})

module.exports =  router