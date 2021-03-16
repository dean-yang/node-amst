const router = require('koa-router')()
var sql = require('../sql')
var FirstClassification = require('../sql/col/firstClassification')
var SecondClassification = require('../sql/col/secondClassification')
var uuid = require('node-uuid')
const utils = require('../utils/token')

router.prefix('/admin/firstClassification')



//修改
router.post('/update', async (ctx,next)=> {
    try {
        await utils.validateToekn(ctx)
    }catch {
        return ctx.body = {
            code:0
        }
    }

    const {
        first_classification_id,
        first_classification_name,
        first_classification_image_url
    } = ctx.request.body
    await sql.update(FirstClassification,{first_classification_id},{
        first_classification_name,first_classification_image_url
    },1)
    ctx.body = {
        code:1,
        message:"修改成功"
    }
})

//删除
router.post('/delete',async (ctx,next) => {

    try {
        await utils.validateToekn(ctx)
    }catch {
        return ctx.body = {
            code:0
        }
    }
    const {
        first_classification_id
    } = ctx.request.body
    const data =  await sql.find(SecondClassification,{first_classification_id})
    if(data.length > 0) {
        return ctx.body = {
            code:2,
            message:"请先删除一级分类里的产品"
        }
    }
    await sql.delete(FirstClassification,{
        first_classification_id
    },1)
    ctx.body  = {
        code:1,
        message:"删除成功"
    }
        
})

// 添加
router.post('/set',async (ctx,next)=>{
    await utils.validateToekn(ctx).then(async ()=>{
        const {
            first_classification_name,
            first_classification_image_url
        } = ctx.request.body
       await sql.insert(FirstClassification,{
            first_classification_name,
            first_classification_image_url,
            first_classification_id:uuid.v1()
        })
        return ctx.body = {
            code:1,
            data:[],
            message:"插入成功"
        }
    }).catch(()=>{
        return ctx.body = {
            code:0
        }
    })
})

// 获取
router.post('/get',async (ctx,next)=>{
    try {
        await utils.validateToekn(ctx)
    }catch {
        return ctx.body = {
            code:0
        }
    } 
    const data =  await sql.find(FirstClassification,ctx.request.body,{_id:0})
    return ctx.body = {
        code:1,
        data
    }
})


module.exports =  router