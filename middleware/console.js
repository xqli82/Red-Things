module.exports = function(req, res, next){
    console.log('user: '+ req.app.username + ' request '+req.method+'  ' + req.url+'')
    next()
}