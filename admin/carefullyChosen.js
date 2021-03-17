const router = require('koa-router')()
var sql = require('../sql')
var CarefullyChosen = require('../sql/col/carefullyChosen')
var SecondClassification = require('../sql/col/secondClassification')
var uuid = require('node-uuid')
const utils = require('../utils/token')
const { request } = require('../app')

router.prefix('/admin/carefullyChosen')



// 插入
router.post('/set', async (ctx,next) => {
    try {
        await utils.validateToekn(ctx)
    }catch {
        return ctx.body = {
            code:0
        }
    }
    const {
        carefullyChosen_name,
        carefullyChosen_image_url,
        carefullyChosen_desc,
        carefullyChosen_price,
        second_classification_id,
    } = ctx.request.body

    const data = await sql.find(SecondClassification,{second_classification_id},{_id:0})

    await sql.insert(CarefullyChosen,{
        carefullyChosen_id:uuid.v1(),
        carefullyChosen_name,
        carefullyChosen_image_url,
        carefullyChosen_desc,
        carefullyChosen_price,
        second_classification_id,
        second_classification_name:data[0].second_classification_name
    })
    return ctx.body = {
        code:1,
        message:"插入成功"
    }
})



// 获取
router.post('/get', async (ctx,next) => {
    try {
        await utils.validateToekn(ctx)
    }catch {
        return ctx.body = {
            code:0
        }
    }

    const data = await sql.find(CarefullyChosen,{},{_id:0})
    return ctx.body = {
        code:1,
        data
    }
})


// 删除
router.post('/delete', async (ctx,next) => {
    try {
        await utils.validateToekn(ctx)
    }catch {
        return ctx.body = {
            code:0
        }
    }
    const {
        carefullyChosen_id
    } = ctx.request.body

    await sql.delete(CarefullyChosen,{carefullyChosen_id},{_id:0})
    return ctx.body = {
        code:1,
        message:"删除成功"
    }
})


// 修改
router.post('/update', async (ctx,next) => {
    try {
        await utils.validateToekn(ctx)
    }catch {
        return ctx.body = {
            code:0
        }
    }
    const {
        carefullyChosen_name,
        carefullyChosen_image_url,
        carefullyChosen_desc,
        carefullyChosen_price,
        second_classification_id,
        carefullyChosen_id
    } = ctx.request.body

    const data = await sql.find(SecondClassification,{second_classification_id},{_id:0})

    await sql.update(CarefullyChosen,{carefullyChosen_id},{
        carefullyChosen_name,
        carefullyChosen_image_url,
        carefullyChosen_desc,
        carefullyChosen_price,
        second_classification_id,
        second_classification_name:data[0].second_classification_name
    })
    return ctx.body = {
        code:1,
        message:"修改成功"
    }
})


module.exports =  router