const mongoose = require('mongoose')
const userSettings = require('../user_settings')

//连接
mongoose.set('useCreateIndex', true)
mongoose.connect(userSettings.db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

//连接成功事件
db.on('connected', function () {
  console.error('connect to mongodb...')
})

//断开连接事件
db.on('disconnected', function () {
  console.log('disconnect to mongodb...')
})

//连接异常事件
db.on('error', function () {
  console.error('connect to mongodb error...')
})

//打开数据库事件
db.once('open', function () {
  console.log('start to user mongodb...')
})

module.exports = mongoose