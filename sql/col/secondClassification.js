

/**
 * 二级分类集合
 * secondClassification
 */

 const mongoose = require('../db') 
 const Schema = mongoose.Schema;
 
 // 设置数据库看集合的字段以及数据类型
 const schema = new Schema({
    first_classification_id:{type: String},  // 关联一级id
    first_classification_name:{type: String},  // 关联一级name
    second_classification_id: { type: String }, // id
    second_classification_name: { type: String }, // 名字
    second_classification_image_url: { type: String }, // 图片
 })
 
 module.exports = mongoose.model('SecondClassification', schema)