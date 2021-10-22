const { Op } = require('sequelize')
const database = require('../models/index.js')

const newTask = async (req, res) => {
  try {
    console.log(req.body)
    const data = req.body.data
    const newTask = await database.Task.create({
      name: data.name,
      status: data.status,
      description: data.description
    })
    res.json(newTask)
  } catch (e) {
    res.json(e)
  }
}

const removeTask = async (req, res) => {
  try {
    const { id } = req.params
    const task = await database.Task.findOne({ where: { id }, raw: true })
    if (task) {
      await Task.destroy({ where: { id } })
      res.json(task)
    }
  } catch (e) {
    res.json(e)
  }
}

const editTask = async (req, res) => {
  try {
    const {id} = req.params
    const { name, status, description } = req.body
    const task = await database.Task.findOne({ where: { id }, raw: true })
    if (task) {
      await database.Task.update({ name, status,description }, { where: { id } })
      const newTask = await database.Task.findOne({ where: { id }, raw: true })
      res.json(newTask)
    }
  } catch (e) {
    res.json(e)
  }
}

const detailTask = async (req, res) => {
  try {
    const { id } = req.params
    const task = await database.Task.findOne({ where: { id }, raw: true })
    if (task) {
      res.json(task)
    } else {
      res.json('Task Not Found')
    }
  } catch (e) {
    res.json(e)
  }
}

const listTask = async (req, res) => {
  console.log(req)
  try {
    const task = await database.Task.findAll({ raw: true })
    // const task = await database.Task.findAndCountAll({
    //   where: { name: { [Op.like]: `%${req.query.keyword}%` } },
    // })
    // console.log(JSON.stringify(task, null, ' '))
    if (task) {
      res.json(task)
    }
  } catch (e) {
    res.json(e)
  }
}

module.exports = { newTask, removeTask, editTask, detailTask, listTask }
