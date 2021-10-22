const  {db} = require('../config/db.config');
const Sequelize = require('sequelize')
const tasks = require('./task')
const user = require('./user.model')


const database = {}

database.Sequelize = Sequelize
database.db = db

database.Task = db.define('Task', tasks)
database.User = db.define('User', user)
database.role = require('../models/role.model.js')(db,Sequelize)

database.role.belongsToMany(database.User,{through: "user_roles", foreignKey: "roleId", otherKey: "userId"})
database.User.belongsToMany(database.role,{through: "user_roles", foreignKey: "userId", otherKey: "roleId"})

database.ROLES = ["user","admin","moderator"]


module.exports = database