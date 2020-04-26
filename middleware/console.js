module.exports = (req, res, next) => {
    console.log('user: '+req.app.username + ' is request ' + req.url)
    next()
}