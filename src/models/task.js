
const {DataTypes} = require("sequelize");

const tasks = {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}

module.exports = tasks