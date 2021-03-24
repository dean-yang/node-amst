/**
 * 地址集合
 * Adress
 */

 const mongoose = require('../db') 
 const Schema = mongoose.Schema;
 
 // 设置数据库看集合的字段以及数据类型
 const schema = new Schema({
    adress_id:{type: String},
    adress_detailed:{type: String},
    contacts_name:{type: String},
    contacts_tel:{type: String},
    province:{type:String},
    city:{type: String},
    area:{type: String},
    user_id:{type: String}
 })
 
 module.exports = mongoose.model('Adress', schema)