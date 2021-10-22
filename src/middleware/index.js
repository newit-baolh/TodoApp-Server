const authJWT = require('./authJWT.js')
const {checkDuplicateUsernameOrEmail,checkRolesExisted} = require('../middleware/verifySignUp.js')
const verifySingUp = {
checkDuplicateUsernameOrEmail,checkRolesExisted
}

module.exports = {
    authJWT,
    verifySingUp
}