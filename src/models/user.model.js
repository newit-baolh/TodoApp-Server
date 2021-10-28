const { DataTypes } = require('sequelize')

const user = {
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    isVerify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}

module.exports = user