const router = require('koa-router')()
var path = require('path')
const Banner = require('../sql/col/banner')
const sql = require('../sql/index')
const utils = require('../utils/token')
const uuid = require('node-uuid')

router.prefix('/admin/banner')



// 删除
router.post('/delete', async (ctx,next)=>{
    try{
        await utils.validateToekn(ctx)
    }catch{
        return ctx.body = {
            code:0
        }
    }

    const {
        banner_id
    } = ctx.request.body
    await sql.delete(Banner,{
        banner_id
    },1)
    return ctx.body = {
        code:1,
        message:"删除成功"
    }

})




// 修改
router.post('/update', async (ctx,next)=>{
    try{
        await utils.validateToekn(ctx)
    }catch{
        return ctx.body = {
            code:0
        }
    }
    const {
        banner_name,
        banner_src,
        banner_id
    } = ctx.request.body

    await sql.update(Banner,{banner_id},{
        banner_name,
        banner_src
    })

    return ctx.body = {
        code:1,
        message:"修改成功"
    }
})



// 获取
router.post('/get', async (ctx,next)=>{
    try{
        await utils.validateToekn(ctx)
    }catch{
        return ctx.body = {
            code:0
        }
    }

   const data = await sql.find(Banner,{},{_id:0})
   return ctx.body =  {
       code:1,
       data
   }
})


// 添加
router.post('/set',async (ctx,next) => {
    try{
        await utils.validateToekn(ctx)
    }catch{
        return ctx.body = {
            code:0
        }
    }

    const {
        banner_name,
        banner_src
    } = ctx.request.body

    await sql.insert(Banner,{
        banner_id:uuid.v1(),
        banner_name,
        banner_src
    })

    return ctx.body = {
        code:1,
        message:"插入成功"
    }
})




  
module.exports =  router