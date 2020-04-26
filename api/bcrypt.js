const bcryptjs = require('bcryptjs')
const userSettings = require('../user_settings')

exports.createPassword = (data) => {
    try {
        return bcryptjs.hashSync(data, userSettings.bcrypt_salt)
    } catch (error) {
        return ''
    }
}

exports.checkPassword = (data, hash) => {
    try {
        return bcryptjs.compareSync(data, hash)
    } catch (error) {
        return false
    }
}
