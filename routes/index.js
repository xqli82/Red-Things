const userRouter = require('./user')
const commonRouter = require('./common')

module.exports = function(app){
  app.use('/user', userRouter)
  app.use('/',commonRouter)

  app.stackPush('all','/user')
}