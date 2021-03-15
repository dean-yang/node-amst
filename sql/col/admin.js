/**
 * admin集合
 * Admin
 */

 const mongoose = require('../db') 

 // 数据库的集合的基础库
 const Schema = mongoose.Schema;
 
 // 设置数据库看集合的字段以及数据类型
 const schema = new Schema({
   admin_id: { type: String },  // 管理员id
   admin_username: { type: String }, // 管理员用户名
   admin_password:{type: String}, // 管理员密码
 })
 
 // 查找或者创建数据库的集合
 // 生成数据库的集合的名称为 admin
 module.exports = mongoose.model('admin', schema)