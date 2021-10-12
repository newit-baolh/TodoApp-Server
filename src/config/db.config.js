

const Sequelize = require('sequelize')
const dotenv = require('dotenv')
dotenv.config()

const { HOST, DB_NAME, DB_USER, DB_PASSWORD, DIALECT } = process.env;
// Tạo db kết nối tới database
const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: HOST,
    dialect: DIALECT,
    timezone: "+07:00",
    // logging: false,
});
// Test kết nối với database
const connect = async () => {
    try {
        await db.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};
const Model = db.models;

module.exports = {db, connect, Model}
