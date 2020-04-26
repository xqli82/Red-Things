const { createToken, decodeToken } = require('../api/jwt')

let data = {
    username: 'xiaoming',
    password: '123'
}

let token = createToken(data)
console.log(token)


setTimeout(() => {
    let old_obj = decodeToken(token)
    console.dir(old_obj)
}, 5000);


