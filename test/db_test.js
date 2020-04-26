const { User,mongoose } = require('../models')
const { createPassword } = require('../api/bcrypt')

setTimeout(async () => {
  let users = await User.find()
  console.log(users)
  mongoose.disconnect()
}, 1000)


// setTimeout(async () => {
//   let msg =await User.remove()
//   console.log(msg)
// }, 1000);


// setTimeout(async () => {
//   let users =await User.update({username:'xiaoming'},{username:'xiaowang'})
//   console.log(users)
// }, 1000);


// setTimeout(async () => {
//   let password = createPassword('123')
//   console.log(password)
//   let user = await User.create({
//     username: 'xiaoming3121',
//     password: password
//   })
//   console.log(user)
//   mongoose.disconnect()
// }, 2000);