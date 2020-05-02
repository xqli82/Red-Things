const userRouter = require('express').Router()
const { Group } = require('../models/index')

userRouter.get('/', function (req, res) {
  res.send({
    username: req.app.username
  })
})

userRouter.post('/group', async (req, res) => {
  let name = req.body.name
  let level = req.body.level
  let stack = req.body.stack
  console.log(req.body)
  if (!name) {
    return res.send({
      code: 500,
      msg: 'name is wrong'
    })
  }
  if (parseInt(level) > 6 || parseInt(level < 0)) {
    return res.send({
      code: 500,
      msg: 'level is wrong'
    })
  }
  try {
    let group = await Group.create({
      name,
      level,
      stack
    })
    res.send({
      code: 200,
      msg: group
    })
  } catch (error) {
    console.log(error)
    res.send({
      code: 500,
      msg: 'save error'
    })
  }

})

userRouter.get('/group', async (req, res) => {
  try {
    let groups = await Group.find()
    res.send({
      code: 200,
      groups
    })
  } catch (error) {
    res.send({
      code: 404,
      msg: 'groups empty'
    })
  }
})

userRouter.delete('/group',async(req,res)=>{
  try {
    let name = req.body.name
    let status = await Group.deleteOne({name})
    console.log(status)
    res.send({
      code:200
    })
  } catch (error) {
    console.log(error)
    res.send({
      code:500
    })
  }
})

module.exports = userRouter