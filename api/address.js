const router = require('koa-router')()
const Adress = require('../sql/col/adress')
const sql = require('../sql/index')
router.prefix('/api/address')
var uuid = require('node-uuid')



    
// 获取地址
router.post('/get', async (ctx,next)=>{
    const {
        user_id
    }    = ctx.request.body
    const data = await sql.find(Adress,{user_id},{_id:0})
    return ctx.body = {
        code:1,
        data,
    }
})

// 添加地址
router.post('/add', async (ctx,next) => {
    const {
        user_id,
        contacts_name,
        contacts_tel,
        city,
        area,
        adress_detailed
    } = ctx.request.body
    try {
        await sql.insert(Adress,{
            user_id,
            contacts_name,
            contacts_tel,
            city,
            area,
            adress_detailed,
            adress_id:uuid.v1()
        })
        return ctx.body = {
            code:1,
            message:'新增成功'
        }
    }
    catch{
        return ctx.body = {
            code:0,
            message:'请稍后再试，或直接拨打客服电话'
        }
    }
})






  
module.exports =  router