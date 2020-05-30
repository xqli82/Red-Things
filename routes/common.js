const commonRouter = require('express').Router()
const { login, logout,mainHtml } = require('../api/models/common')

commonRouter.get('/login', function (req, res) {
    res.render('login.html', {
        title: 'login'
    })
})

commonRouter.get('/stack',function(req,res){
    res.send({
        code:200,
        stack:req.app.stack
    })
})

commonRouter.post('/login', login)
commonRouter.post('/logout', logout)

module.exports = commonRouter