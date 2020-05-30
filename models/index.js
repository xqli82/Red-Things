const db = require('./db')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, default: '' },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  super: { type: Boolean, default: false }
})

const groupSchema = new Schema({
  name: { type: String, default: 'Group1', unique: true },
  level: { type: String, default: 0 },
  stack: { type: Object, default: null }
})


const User = mongoose.model('User', userSchema)
const Group = mongoose.model('Group', groupSchema)

module.exports = {
  User,
  Group,
  db
}