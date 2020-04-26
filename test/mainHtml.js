const fs = require('fs')
const path = require('path')

let data = fs.readFileSync('../vue-html/dist/index.html')
console.log(data)