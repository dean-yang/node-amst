const router = require('koa-router')()
var sql = require('../sql')
var SecondClassification = require('../sql/col/secondClassification')
var FirstClassification = require('../sql/col/firstClassification')
var CarefullyChosen = require('../sql/col/carefullyChosen')
var changeSeasonClean = require('../sql/col/changeSeasonClean')
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

    const carefullyChosenData  = await sql.find(CarefullyChosen,{second_classification_id},{_id:0})
    if(carefullyChosenData.length > 0) {
        return ctx.body = {
            code:2,
            message:"请先删除本二级产品所关联精选产品"
        }
    }
    const changeSeasonCleanData = await sql.find(changeSeasonClean,{second_classification_id},{_id:0})
    if(changeSeasonCleanData.length > 0) {
        return ctx.body = {
            code:2,
            message:"请先删除本二级产品所关联换季清洗产品"
        }
    }

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
    const {
        pageNo,
        pageSize
    } = ctx

    const data =  await sql.paging(SecondClassification,{},{_id:0},pageNo,pageSize)

    return ctx.body = {
        code:1,
        data:{
            list:data,
            pageNo,
            pageSize:data.length
        }
    }
})


module.exports =  router