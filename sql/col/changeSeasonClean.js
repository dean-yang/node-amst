changeSeasonClean

/**
 * 换季清洗
 * ChangeSeasonClean
 */

 const mongoose = require('../db') 
 const Schema = mongoose.Schema;
 
 // 设置数据库看集合的字段以及数据类型
 const schema = new Schema({
    second_classification_id:{type: String},  // 关联二级id
    clean_changeSeason_id: { type: String }, // id
    clean_changeSeason_name: { type: String }, // 名字
    clean_changeSeason_image_url: { type: String }, // 图片
 })
 
 module.exports = mongoose.model('ChangeSeasonClean', schema)