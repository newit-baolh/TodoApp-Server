const config = require('../config/auth.config')
const Sequelize = require('sequelize')
const database = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const Op = Sequelize.Op

exports.signup = (req, res) => {
    // Save User to Database
    const {username, email, password, roles} = req.body
    database.User.create({
        username: username,
        email: email,
        password: bcrypt.hashSync(password, 8)
    })
        .then(user => {
            if (roles) {
                database.role.findAll({
                    where: {
                        name: {
                            [Op.or]: roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send({
                            message: "Đăng ký người dùng thành công!"
                        })
                    })
                })
            } else {
                // user role  = 1
                user.setRoles([1]).then(() => {
                    res.send({
                        message: "Đăng ký người dùng thành công!"
                    })
                })
            }
        })
        .catch(err => {
            res.status(500).send({message: err.message})
        })
}
exports.signin = (req, res) => {
    const {username, password} = req.body
    database.User.findOne({
        where: {
            username: username
        }
    })
        .then(user => {
            // Compare User
            if (!user) {
                return res.status(404).send({
                    message: "Người dùng không tồn tại."
                })
            }
            // Compare Password
            const passwordIsValid = bcrypt.compareSync(
                password, user.password
            )
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Sai mật khẩu!"
                })
            }

            const token = jwt.sign(
                {id: user.id}, config.secret, {
                    expiresIn: 86400 //24 hours
                }
            )
            let authorities = []
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push('ROLE_' + roles[i].name.toUpperCase())
                }
                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    roles: authorities,
                    accessToken: token
                })
            })

        })
        .catch(err => {
            res.status(500).send({message: err.message})
        })
}