const commonRouter = require('express').Router()
const { login, logout,mainHtml } = require('../api/models/common')

commonRouter.get('/login', function (req, res) {
    res.render('login.html', {
        title: 'login'
    })
})

commonRouter.post('/login', login)
commonRouter.post('/logout', logout)

module.exports = commonRouter