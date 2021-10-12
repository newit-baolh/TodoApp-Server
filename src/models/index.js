const  {db} = require('../config/db.config');
const tasks = require('./task')

const Task = db.define('Task', tasks)

module.exports = Task