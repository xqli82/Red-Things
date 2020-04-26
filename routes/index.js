const userRouter = require('./user')
const commonRouter = require('./common')

module.exports = (app)=>{
  app.use('/user', userRouter)
  app.use('/',commonRouter)
}