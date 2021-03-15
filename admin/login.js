const router = require('koa-router')()
var sql = require('../sql')
var Admin = require('../sql/col/admin')
var uuid = require('node-uuid')
var jwt = require('jsonwebtoken')

router.prefix('/admin/login')

/**
 *  login api
 */
router.post('/', async (ctx, next) => {
    const {adminUsername,adminPassword} = ctx.request.body
    const admin_username = adminUsername
    const admin_password = adminPassword
    let data =  await sql.find(Admin,{admin_username,admin_password},{_id:0})
    if(data.length){
      const token = jwt.sign({ userid: data[0].userid}, 'amst-admin', {
        expiresIn: 7 * 24 * 60 * 60 // 单位为秒
      })
      ctx.body = {
        code:1,
        data:{
          token,
          adminUsername,
          adminPassword,
          adminId:data[0].admin_Id
        },
      }
    }else{
      ctx.body = {
        code:2,
        data,
        message:"账号或密码错误"
      }
    }
})

module.exports = router;

