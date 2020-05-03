const userRouter = require('./user')
const groupRouter = require('./group')
const commonRouter = require('./common')

module.exports = function(app){
  app.use('/user', userRouter)
  app.use('/group', groupRouter)
  app.use('/',commonRouter)

  app.stackPush('all','/user')
  app.stackPush('all','/group')
}