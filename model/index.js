const config = require('../config')

const mongoose = require('mongoose')

// 连接数据库
mongoose.connect(config.db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', err => {
  console.log('连接失败!', err);
})

db.on('open', () => {
  console.log('连接成功!');
})