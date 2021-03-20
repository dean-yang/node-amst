const router = require('koa-router')()
var fs = require('fs')
var path = require('path')
const common = require('../utils/common')

router.prefix('/admin/uploadImg')


/**
 * 上传图片
 * 返回图片地址
 */
router.post('/', async (ctx, next) => {
    // 上传单个图片
    // console.log(ctx.request.files.file.path, '==========================')
    const file = ctx.request.files.file // 获取上传文件
    // // 创建可读流
    const reader = fs.createReadStream(file.path);
    const timeStr = new Date().getTime()
    let filePath = path.join(__dirname, '../public/images') + `/${timeStr}${file.name}`;
    // // // // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // // // 可读流通过管道写入可写流
    reader.pipe(upStream);
    const url = `${common.ip}${timeStr}${file.name}`
    return ctx.body = {
        code:1,
        data:{
            url:url,
            name:  timeStr + file.name
        },
    };
});
module.exports =  router