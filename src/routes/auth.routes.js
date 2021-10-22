
const controller = require("../controllers/auth.controller");
const {checkDuplicateUsernameOrEmail,checkRolesExisted} = require('../middleware/verifySignUp')

const express = require('express')
const authRoutes = express.Router()

authRoutes.post("/signup",
    [
        checkDuplicateUsernameOrEmail,
        checkRolesExisted
    ],
    controller.signup)
authRoutes.post("/signin", controller.signin)

module.exports = authRoutes
