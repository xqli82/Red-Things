const jwt = require('jsonwebtoken')
const userSettings = require('../user_settings')

exports.createToken = (data) => {
    try {
        if (!userSettings.expireIn) {
            return jwt.sign(data, userSettings.jwt_key)
        } else {
            return jwt.sign(data, userSettings.jwt_key, {
                expiresIn: userSettings.expireIn
            })
        }
    } catch (error) {
        return ''
    }
}

exports.decodeToken = (data) => {
    try {
        return jwt.verify(data, userSettings.jwt_key)
    } catch (error) {
        console.log('decode token error')
        return ''
    }
}