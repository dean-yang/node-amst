const router = require('koa-router')()
var path = require('path')
const Banner = require('../sql/col/banner')
const sql = require('../sql/index')
const utils = require('../utils/token')
const uuid = require('node-uuid')

router.prefix('/api/banner')

// 获取
router.post('/get', async (ctx,next)=>{
   const data = await sql.find(Banner,{},{_id:0})
   return ctx.body =  {
       code:1,
       data
   }
})






  
module.exports =  router