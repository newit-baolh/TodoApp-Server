const express = require('express')
const rootRouter = express.Router()
const {newTask,removeTask,editTask,detailTask,listTask} = require('../controllers/todoList.js')

//http://localhost:5000/api/todo
rootRouter.post('/add',newTask)
rootRouter.delete('/delete',removeTask)
rootRouter.put('/edit/',editTask)
rootRouter.get('/detail/:id',detailTask)
rootRouter.get('/list',listTask)

module.exports = rootRouter