const router = require('koa-router')()
var sql = require('../sql')
var ChangeSeasonClean = require('../sql/col/changeSeasonClean')
var SecondClassification = require('../sql/col/secondClassification')
var uuid = require('node-uuid')
const utils = require('../utils/token')

router.prefix('/admin/changeSeasonClean')



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
        clean_changeSeason_name,
        clean_changeSeason_image_url,
        second_classification_id
    } = ctx.request.body

    const data = await sql.find(SecondClassification,{second_classification_id},{_id:0})
    await sql.insert(CarefullyChosen,{
        clean_changeSeason_id:uuid.v1(),
        clean_changeSeason_name,
        clean_changeSeason_image_url,
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

    const data = await sql.find(ChangeSeasonClean,{},{_id:0})
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
        clean_changeSeason_id
    } = ctx.request.body

    await sql.delete(ChangeSeasonClean,{clean_changeSeason_id},{_id:0})
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
        clean_changeSeason_id,
        clean_changeSeason_name,
        clean_changeSeason_image_url,
        second_classification_id
    } = ctx.request.body

    const data = await sql.find(SecondClassification,{second_classification_id},{_id:0})

    await sql.update(CarefullyChosen,{carefullyChosen_id},{
        clean_changeSeason_id,
        clean_changeSeason_name,
        clean_changeSeason_image_url,
        second_classification_name:data[0].second_classification_name
    })
    return ctx.body = {
        code:1,
        message:"修改成功"
    }
})


module.exports =  router