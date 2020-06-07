module.exports = function (req, res, next) {
    let userType = req.app.userType
    let userPermission = req.app.userPermission
    const whiteList = [
        { method: 'GET', url: '/favicon.ico' },
        { method: 'GET', url: '/login' },
        { method: 'POST', url: '/login' },
        { method: 'GET', url: '/user' },
    ]
    if (userType) {
        next()
    } else if (whiteList.some(item => {
        return req.method === item.method && req.url === item.url
    })) {
        console.log("request in whiteList")
        next()
    } else {
        try {
            let userStack = userPermission.stack
            console.log(req.method, req.url)
            let req_url = '/' + req.url.split('/')[1]
            if (userStack.some(item => {
                return item.method === req.method && item.url === req_url
            })) {
                next()
            } else {
                res.send({
                    code: '500',
                    msg: '无权限访问'
                })
            }
        } catch (error) {
            res.send('无访问权限')
        }
    }

}