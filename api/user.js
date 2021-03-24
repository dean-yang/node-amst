const router = require('koa-router')()
const User = require('../sql/col/user')
const sql = require('../sql/index')

router.prefix('/api/user')

// 登陆
router.post('/login', async (ctx,next)=>{
    const {
        user_login_name,
        user_tel,
        user_password,
    } = ctx.request.body
   const data = await sql.find(User,{user_login_name,user_tel,user_password},{_id:0})
   return ctx.body =  {
       code:1,
       data
   }
})






  
module.exports =  router