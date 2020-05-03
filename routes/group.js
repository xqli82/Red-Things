const groupRouter = require('express').Router()
const { Group } = require('../models/index')

groupRouter.get('/list', async (req, res) => {
    let groups = await Group.find()
    let data = groups.map(item => item.name)
    res.send({
        code: 200,
        data: data
    })
})


module.exports = groupRouter