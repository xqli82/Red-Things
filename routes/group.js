const groupRouter = require('express').Router()
const { Group } = require('../models/index')

groupRouter.get('/list', async (req, res) => {
    try {
        let groups = await Group.find()
        res.send({
            code: 200,
            data: groups
        })
    } catch (error) {
        res.send({
            code: 404
        })
    }

})


groupRouter.post('/group', async (req, res) => {
    let name = req.body.name
    let level = req.body.level
    let stack = req.body.stack
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


groupRouter.delete('/group', async (req, res) => {
    try {
        let _id = req.body.id
        let status = await Group.deleteOne({ _id })
        res.send({
            code: 200
        })
    } catch (error) {
        console.log(error)
        res.send({
            code: 500
        })
    }
})

groupRouter.put('/group/:name', async (req, res) => {
    try {
        let group = await Group.updateOne({ name: req.params.name }, req.body)
        res.send({
            code: 200
        })
    } catch (error) {
        res.send({
            code: 500
        })
    }
})

module.exports = groupRouter