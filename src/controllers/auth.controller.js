const config = require('../config/auth.config')
const Sequelize = require('sequelize')
const database = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')

const Op = Sequelize.Op

exports.signup = (req, res) => {
  // Save User to Database
  const { username, email, password, roles } = req.body
  database.User.create({
    username: username,
    email: email,
    password: bcrypt.hashSync(password, 8),
  })
    .then((user) => {
      if (roles) {
        database.role
          .findAll({
            where: {
              name: {
                [Op.or]: roles,
              },
            },
          })
          .then((roles) => {
            user.setRoles(roles).then(() => {
              res.send({
                message: 'Đăng ký người dùng thành công!',
              })
            })
          })
      } else {
        // user role  = 1
        user.setRoles([1]).then(() => {
          res.send({
            message: 'Đăng ký người dùng thành công!',
          })
        })
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message })
    })
}
exports.signin = (req, res) => {
  const { email, password } = req.body
  database.User.findOne({
    where: {
      email: email,
    },
  })
    .then((user) => {
      // Compare User
      if (!user) {
        return res.status(404).send({
          message: 'Email không tồn tại.',
        })
      }
      // Compare Password
      const passwordIsValid = bcrypt.compareSync(password, user.password)
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Sai mật khẩu!',
        })
      }
      // Create token
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, //24 hours
      })
      // Response role
      let authorities = []
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push('ROLE_' + roles[i].name.toUpperCase())
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
          isVerify: user.isVerify,
        })
      })
    })
    .catch((err) => {
      res.status(500).send({ message: err.message })
    })
}

exports.confirmEmail = (req, res) => {
  const { email, accessToken } = req.body
  req.user = { email, accessToken }
  database.User.findOne({ where: { email: email } }).then((user) => {
    if (!user) {
      return res.status(404).send({
        message: 'Email không tồn tại.',
      })
    }
    if (user.isVerify === true) {
      return res
        .status(200)
        .send('User has been already verified. Please Login')
    }
    let transport = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'b70376426d2c0f',
        pass: 'fc8724cc7a855c',
      },
    })

    let mailOptions = {
      from: 'verify-email@todo.com',
      to: user.email,
      subject: 'Account Verification Link',
      text: `Hello ${user.username}`,
      html: `<a href="http://localhost:3000/verified">Please verify your account by clicking here </a>`,
    }
    transport.sendMail(mailOptions, (err) => {
      if (err) {
        return res.status(500).send({
          message:
            'Technical Issue!, Please click on resend for verify your Email.',
        })
      }
      return res
        .status(200)
        .send(`A verification email has been sent to ${user.email}`)
    })
  })
}
exports.verifyEmail = (req, res) => {
  const { email, accessToken } = req.body
  if (!(email && accessToken)) return
  database.User.findOne({ where: { email: email } }).then((user) => {
    if (!user) return
    user.update({ isVerify: true }, { where: { email: user.email } })
    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: this.roles,
      accessToken: accessToken,
      isVerify: user.isVerify,
    })
  })
}

exports.forgotPassword = async (req, res) => {
  const { email } = req.body
  req.userEmail = req.body.email
  if (!email) return res.status(403).send('Missing email input')
  await database.User.findOne({ where: { email: email } }).then((user) => {
    if (!user) return res.status(404).send('Email do not exist on system')
    let transport = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'b70376426d2c0f',
        pass: 'fc8724cc7a855c',
      },
    })

    let mailOptions = {
      from: 'verify-email@todo.com',
      to: user.email,
      subject: 'Reset Password',
      text: `Hello ${user.username}`,
      html: `<a href="http://localhost:3000/resetPassword">Please click link to reset password </a>`,
    }
    transport.sendMail(mailOptions, (err) => {
      if (err) {
        return res.status(500).send({
          message:
            'Technical Issue!, Please click on resend for verify your Email.',
        })
      }
      return res.status(200).send({
        message: `A verification email has been sent to ${user.email}`,
        email: user.email,
      })
    })
  })
}

exports.resetPassword = async (req, res) => {
  const { password, email } = req.body
  if (!password) return res.status(403).send('Missing password input')
  await database.User.findOne({ where: { email: email } }).then(
    async (user) => {
      if (!user) return res.status(404).send('User not found')
      await database.User.update(
        { password: bcrypt.hashSync(password, 8) },
        { where: { email: user.email } }
      )
      res.status(200).send('Updated password successful')
    }
  )
}
