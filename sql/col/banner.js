/**
 * banner图集合
 * Banner
 */

const mongoose = require('../db') 

// 数据库的集合的基础库
const Schema = mongoose.Schema;

// 设置数据库看集合的字段以及数据类型
const schema = new Schema({
  banner_id: { type: String },
  banner_name: { type: String },
  banner_src:{type: String},
})

// 查找或者创建数据库的集合
// 生成数据库的集合的名称为 Banner
module.exports = mongoose.model('Banner', schema)