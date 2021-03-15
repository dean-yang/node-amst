/**
 * 一级分类集合
 * FirstClassification
 */

 const mongoose = require('../db') 
 const Schema = mongoose.Schema;
 
 // 设置数据库看集合的字段以及数据类型
 const schema = new Schema({
    first_classification_id: { type: String }, // id
    first_classification_name: { type: String }, // 名字
    first_classification_image_url: { type: String }, // 图片
 })
 
 module.exports = mongoose.model('FirstClassification', schema)