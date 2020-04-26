const mongoose = require('./db')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  level: { type: Number, default: 0 }
})

const User = mongoose.model('User', userSchema)

module.exports = {
  User,
  mongoose
}