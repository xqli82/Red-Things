const userRouter = require('express').Router()
const { Group, User } = require('../models/index')
const { createPassword } = require('../api/bcrypt')

userRouter.get('/', function (req, res) {
  res.send({
    username: req.app.username
  })
})

userRouter.get('/user', async (req, res) => {
  try {
    let users = await User.find().populate('group')
    if (users) {
      res.send({
        code: 200,
        data: users
      })
    }
  } catch (error) {
    res.send({
      code: 500
    })
  }
})

userRouter.delete('/user', async (req, res) => {
  try {
    let status = await User.deleteOne({
      _id: req.body.id
    })
    console.log(status)
    if (status) {
      res.send({
        code: 200
      })
    }
  } catch (error) {
    res.send({
      code: 500
    })
  }
})

userRouter.put('/user/:id', async (req, res) => {
  try {
    let nickname = req.body.nickname
    let group = req.body.group
    let user = await User.updateOne({ _id: req.params.id }, { nickname: nickname, group: group })
    res.send({
      code: 200,
      data: user
    })
  } catch (error) {
    res.send({
      code: 500
    })
  }
})


userRouter.post('/user', async (req, res) => {
  try {
    let username = req.body.username
    let password = req.body.password
    let nickname = req.body.nickname
    let group = req.body.group
    let user = await User.findOne({ username: username })
    if (user || !password) {
      res.send({
        code: 300,
        msg: '用户名已经存在/密码不能为空'
      })
    } else {
      password = createPassword(password)
      let user = await User.create({ username: username, password: password, nickname: nickname, group: group })
      res.send({
        code: 200,
        data: user
      })
    }
  } catch (error) {
    res.send({
      code: 500
    })
  }
})

userRouter.post('/modify',async(req,res)=>{
  try {
    let username = req.body.username
    let password = req.body.password
    if(!password){
      res.send({
        code:200,
        msg:'密码不能为空'
      })
    }
    let user = await User.findOne({username:username})
    if(user){
      password=createPassword(password)
      await User.updateOne({username:username},{password:password})
      res.send({
        code:200,
        msg:'修改密码成功'
      })
    }else{
      res.send({
        code:200,
        msg:'用户不存在'
      })
    }
  } catch (error) {
    res.send({
      code:500
    })
  }
})

module.exports = userRouter