const { authJWT } = require("../middleware");
const controller = require("../controllers/user.controller");

const express = require('express')
const userRoutes = express.Router()

userRoutes.get("/all", controller.allAccess);

userRoutes.get(
    "/user",
    [authJWT.verifyToken],
    controller.userBoard
);

userRoutes.get(
    "/mod",
    [authJWT.verifyToken, authJWT.isModerator],
    controller.moderatorBoard
);

userRoutes.get(
    "/admin",
    [authJWT.verifyToken, authJWT.isAdmin],
    controller.adminBoard
);

module.exports = userRoutes
