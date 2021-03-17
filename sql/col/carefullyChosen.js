/**
 * 精选集合
 * CarefullyChosen
 */

 const mongoose = require('../db') 
 const Schema = mongoose.Schema;
 
 // 设置数据库看集合的字段以及数据类型
 const schema = new Schema({
   second_classification_name:{type: String},  // 关联二级产品名字
   second_classification_id: { type: String }, // 关联二级id
   carefullyChosen_id:{type: String},  // id
   carefullyChosen_name: { type: String }, // 名字
   carefullyChosen_image_url: { type: String }, // 图片
   carefullyChosen_desc:{type:String}, // 描诉
   carefullyChosen_price:{type:String} // 价格
 })
 
 module.exports = mongoose.model('CarefullyChosen', schema)