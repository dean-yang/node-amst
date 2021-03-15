var jwt = require('jsonwebtoken');
module.exports = {
  validateToekn (ctx) {
    // 头信息 / get提交 / post提交
    const token = ctx.request.header.token || ctx.request.body.token || ctx.query.body
    return new Promise((resolve, reject) => {
      if (token) { // 获取到了token
        // 验证token
        jwt.verify(token, 'amst-admin', (err, decoded) => {
          if (err) { // 验证失败
           return reject()
          } else {
            // 验证成功
            // ctx.decoded = decoded
           return resolve()
          }
        })
      } else {
        // 没有收到token - 失败 - 没有登录
        reject()
      }
    })
  },
}