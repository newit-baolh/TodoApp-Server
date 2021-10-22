const {
    newTask,
    removeTask,
    editTask,
    detailTask,
    listTask,
} = require('../controllers/todoList.js')

const express = require('express')
const taskRoutes = express.Router()

taskRoutes.post('/add', newTask)
taskRoutes.delete('/delete/:id', removeTask)
taskRoutes.put('/update/:id', editTask)
taskRoutes.get('/detail/:id', detailTask)
taskRoutes.get('/list', listTask)

module.exports = taskRoutes