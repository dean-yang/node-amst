const router = require('koa-router')()
var sql = require('../sql')
var SecondClassification = require('../sql/col/secondClassification')
var FirstClassification = require('../sql/col/firstClassification')
var uuid = require('node-uuid')
const utils = require('../utils/token')

router.prefix('/admin/secondClassification')

//删除
router.post('/delete', async (ctx,next)=>{
    try{
        await utils.validateToekn(ctx)
    }catch{
        return ctx.body = {
            code:0
        }
    }
    const {
        second_classification_id
    } = ctx.request.body
    await sql.delete(SecondClassification,{second_classification_id})

    return ctx.body = {
        code:1,
        message:"删除成功"
    }
})




//修改
router.post('/update', async (ctx,next)=>{
    try{
        await utils.validateToekn(ctx)
    }catch{
        return ctx.body = {
            code:0
        }
    }
    const {
        first_classification_id,
        second_classification_name,
        second_classification_image_url,
        second_classification_id
    } = ctx.request.body
    const data = await sql.find(FirstClassification,{first_classification_id})
    await sql.update(SecondClassification,{second_classification_id},{
        first_classification_id,
        second_classification_name,
        second_classification_image_url,
        first_classification_name:data[0].first_classification_name,
    })
    return ctx.body = {
        code:1,
        message:"修改成功"
    }
})


// 添加
router.post('/set', async (ctx,next)=>{
    try{
        await utils.validateToekn(ctx)
    }catch{
        return ctx.body = {
            code:0
        }
    }
    const {
        first_classification_id,
        second_classification_name,
        second_classification_image_url
    } = ctx.request.body
    const data = await sql.find(FirstClassification,{first_classification_id})
    if(data.length < 1){
        return ctx.body = {
            code:2,
            message:"新增失败，没有此一级分类"
        }
    }
    await sql.insert(SecondClassification,{
        first_classification_id,
        first_classification_name:data[0].first_classification_name,
        second_classification_name,
        second_classification_image_url,
        second_classification_id:uuid.v1()
    })
    ctx.body = {
        code:1,
        message:"插入成功"
    }
})

// 获取
router.post('/get',async (ctx,next)=>{
    try{
        await utils.validateToekn(ctx)
    }catch{
        return ctx.body = {
            code:0
        }
    }

    const data =  await sql.find(SecondClassification,{},{_id:0})

    return ctx.body = {
        code:1,
        data
    }
})


module.exports =  router