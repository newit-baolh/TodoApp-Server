
const Task = require('../models')

const newTask = async (req,res)=>{
    try {
        const data = req.body
        const newTask = await Task.create({
            name: data.name, status: data.status
        })
        res.json(newTask)
    }catch (e) {
        res.json(e)
    }
}

const removeTask = async (req,res)=>{
    try {
        const {id} = req.body
        const task = await Task.findOne({where: {id}, raw: true })
        if(task){
            await Task.destroy({where: {id}})
            res.json(task)
        }
    }catch (e) {
        res.json(e)
    }
}

const editTask = async (req,res)=>{
    try {
        const {id, name, status} = req.body
        const task = await Task.findOne({where: {id}, raw: true })
        if(task){
            await Task.update({name, status},{where: {id}})
            const newTask = await Task.findOne({ where: { id } , raw: true });
            res.json(newTask)
        }
    }catch (e) {
        res.json(e)
    }
}

const detailTask = async (req,res)=>{
    try {
        const {id} = req.params
        const task = await Task.findOne({ where: { id }, raw: true })
        if (task) {
            res.json(task)
        } else {
            res.json("Task Not Found")
        }
    }catch (e) {
        res.json(e)
    }
}

const listTask = async (req,res)=>{
    try {
        const task = await Task.findAll()
        if(task){
            res.json(task)
        }
    }catch (e) {
        res.json(e)
    }
}


module.exports = {newTask,removeTask,editTask,detailTask,listTask}