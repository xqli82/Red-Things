const express = require('express')
const http = require('http')
const RED = require('node-red');
const path = require('path')
const routes = require('./routes')
const { auth, log } = require('./middleware')
const cookies = require('cookie-parser')
const userSettings = require('./user_settings')
const stackPush = require('./utils/pushParser')
const redFunction = require('./RedFunction')

const app = express()

app.stack = []
app.stackPush = stackPush

app.baseDir = __dirname

//static files
app.use('/static', express.static("public"))
// app.use('/vue', express.static("vue-html/dist/vue")) //old url , not use
app.use('/sa', express.static("admin/dist/sa"))  //static-admin 未来的功能扩展-管理员端
// app.use('/sc', express.static("admin/dist/sc"))  //static-client 未来的功能扩展-客户端

// view engine setup
app.engine('html', require('express-art-template'));
app.set('views', {
  debug: true
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookies())

app.use(auth)
app.use(log)

// app.use('/main', express.static("vue-html/dist/index.html")) //old url,not use
app.use('/admin', express.static("admin/dist/index.html"))
// app.use('/client', express.static("client/dist/index.html"))

routes(app)

const server = http.createServer(app)

//node-red user dir
const nodePath = path.join(__dirname, 'red_dir')

let settings = {
  httpAdminRoot: "/red",
  httpNodeRoot: "/api",
  userDir: nodePath,
  ui: { path: '/ui' },
  functionGlobalContext: redFunction,    // enables global context
  credentialSecret: "fdsfrrrwtta"
};

app.stackPush('all', '/red')
app.stackPush('all', '/api')

// Initialise the runtime with a server and settings
RED.init(server, settings);

// Serve the editor UI from /red
app.use(settings.httpAdminRoot, RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot, RED.httpNode);

app.use(function (err, req, res, next) {
  if (err) {
    res.send('sorry,error coming...')
  }
})

app.all('*', async function (req, res) {
  await setTimeout(() => {
    res.render('404.html', {})
  }, 500);
})



server.listen(userSettings.port, function () {
  console.log(`--------------------------server is running on port:${userSettings.port}--------------------------------`)
});

// Start the runtime
RED.start();