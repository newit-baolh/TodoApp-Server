const express = require('express')
const rootRouter = express.Router()

const taskRoutes = require('./task.routes')
const authRoutes = require('./auth.routes')
const userRoutes = require('./user.routes')


//http://localhost:5000/api


rootRouter.use('/api',taskRoutes)

rootRouter.use('/api/auth',authRoutes)

rootRouter.use('/api/user',userRoutes)


module.exports = rootRouter
