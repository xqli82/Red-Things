const { User } = require('../../models')
const { createPassword, checkPassword } = require('../bcrypt')
const { createToken } = require('../jwt')
const userSettings = require('../../user_settings')
const fs = require('fs')
const path = require('path')

exports.login = async (req, res) => {
    try {
        let username = req.body.username
        let password = req.body.password
        let user = await User.findOne({
            username: username
        })
        if (!user) {
            return res.send({
                code: 404,
                msg: 'cant find username'
            })
        }
        let flag = checkPassword(password, user.password)
        if (flag) {
            return res.send({
                code: 200,
                token: createToken({ id: user._id })
            })
        } else {
            return res.send({
                code: 422,
                msg: 'password is wrong'
            })
        }
    } catch (error) {
        res.send({
            code: 422,
            msg: 'error'
        })
    }
}

exports.logout = (res, req) => {

}

// exports.mainHtml = (req, res) => {
//     // try {
//         let dir = path.join(req.app.baseDir,'vue-html','dist','index.html')
//         console.log(dir)
//         let data = fs.readFileSync(dir)
//         console.log(data.toString)
//         res.send(data.toString())
// //     } catch (error) {
// //         res.send('error')
// //     }
// }