const router = require('koa-router')()
const User = require('../sql/col/user')
const sql = require('../sql/index')
const https = require('https')
const iconv = require("iconv-lite");  


router.prefix('/api/user')


/**
 * 
 * 微信登陆
 * @param {*} appid 
 * @param {*} secret 
 * @param {*} code 
 */
function login(appid,secret,code){
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
    return new Promise((resolve,reject)=>{
        https.get(url,function async (res){
            var datas = [];  
            var size = 0;  
            res.on('data', function (data) {  
                datas.push(data);  
                size += data.length;  
            //process.stdout.write(data);  
            });  
            res.on("end", function () {  
                var buff = Buffer.concat(datas, size);  
                var result = iconv.decode(buff, "utf8");//转码//var result = buff.toString();//不需要转编码,直接tostring
                result = JSON.parse(result)  
                return resolve(result)
            });  
        }).on("error", function (err) {
           return rejects(err)
        }); 
    })
}

// 登陆
router.post('/login', async (ctx,next)=>{
    const {
        user_name,
        user_avatar,
        user_tel,
        appid,
        secret,
        code
    } = ctx.request.body
    try{
        const app = await login(appid,secret,code)
        const userData = await sql.find(User,{user_id:app.openid},{_id:0})
        if(userData.length > 0){
            await sql.update(User,{user_id:app.openid},{
                user_lasttime:new Date().getTime(),
                user_name,
                user_avatar,
                user_tel
            })
            const upData = await sql.find(User,{user_id:app.openid},{_id:0})
            return ctx.body = {
                code:1,
                data:{
                    user_id:upData[0].user_id,
                    user_tel:upData[0].user_tel,
                    user_name:upData[0].user_name,
                    user_avatar:upData[0].user_avatar,
                    user_firsttime:upData[0].user_firsttime,
                    user_lasttime:upData[0].user_lasttime,
                    session_key:app.session_key,
                }
            }
        }else{
            await sql.insert(User,{
                user_id:app.openid,
                user_tel,
                user_name,
                user_avatar,
                user_firsttime:new Date().getTime(),
                user_lasttime:new Date().getTime(),
                user_role:1
            })
            return ctx.body = {
                code:1,
                data:{
                    user_id:app.openid,
                    user_tel,
                    user_name,
                    user_avatar,
                    user_firsttime:new Date().getTime(),
                    user_lasttime:new Date().getTime(),
                    user_role:1,
                    session_key:app.session_key,
                }
            }
        }
    }catch(error){
        return ctx.body = {
            code:0,
            message:"登陆失败，请重新登陆或联系客服",
            error:error
        }
    }
    
})







  
module.exports =  router