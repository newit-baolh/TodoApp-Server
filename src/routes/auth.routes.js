const controller = require('../controllers/auth.controller')
const {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
} = require('../middleware/verifySignUp')

const express = require('express')
const authRoutes = express.Router()

authRoutes.post(
  '/signup',
  [checkDuplicateUsernameOrEmail, checkRolesExisted],
  controller.signup
)
authRoutes.post('/signin', controller.signin)
authRoutes.post('/confirmEmail', controller.confirmEmail)
authRoutes.post('/verifyEmail', controller.verifyEmail)
authRoutes.post('/forgotPassword', controller.forgotPassword)
authRoutes.post('/resetPassword', controller.resetPassword)

module.exports = authRoutes
