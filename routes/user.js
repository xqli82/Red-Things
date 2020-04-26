const userRouter = require('express').Router()

userRouter.get('/',function(req,res){
  res.send({
    username:req.app.username
  })
})

module.exports = userRouter