const { User, mongoose } = require('../models')
const { createPassword } = require('../api/bcrypt')
const  userSettings = require('../user_settings')

setTimeout(async () => {
    let username = process.argv[2]
    let password = process.argv[3]
    let supper = true
    console.log(`your message is ::\n username:${username}\n password:${password}\n supper:${supper}`)
    if (!(username && password)) {
        console.log('Please input right message')
        mongoose.disconnect()
        return
    }
    let user = await User.create({
        username:username,
        password:createPassword(password,userSettings.bcrypt_salt),
        supper:supper
    })
    console.log(user)
    mongoose.disconnect()
}, 2000)

