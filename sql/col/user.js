/**
 * user集合
 * User
 */

const mongoose = require('../db') 
const Schema = mongoose.Schema;

// 设置数据库看集合的字段以及数据类型
const schema = new Schema({
  user_id: { type: String },   // id
  user_login_name: { type: String }, //  登陆名  微信账号
  user_tel:{type:String}, // 手机号
  user_password: { type: String }, // 密码
  user_name:{type:String}, // 用户名  微信名字 
  user_avatar: { type: String }, // 头像 
  user_firsttime:{type: String}, // 注册时间 
  user_lasttime: { type: String }, // 最近一次的登录时间
  user_role: { type: Number }, //1 普通用户  2 会员用户
})

module.exports = mongoose.model('User', schema)