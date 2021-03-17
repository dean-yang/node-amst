const mongoose = require('mongoose');

// 链接地址
const DB_URL = 'mongodb://47.108.200.61:27017/amst';

// 链接数据库服务器
mongoose.connect(DB_URL, { useNewUrlParser: true,  useUnifiedTopology: true });

// 链接成功   --- 监听成功的事件
mongoose.connection.on('connected', () => {
  console.log('数据库链接成功')
})

// 链接断开
mongoose.connection.on('disconnected', () => {
  console.log('数据库链接断开')
})

// 链接异常
mongoose.connection.on('error', (err) => {
  console.log('链接异常', err)
})
// 数据库的链接操作
// 模块化的操作
module.exports = mongoose