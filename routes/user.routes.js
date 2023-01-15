const express = require("express");

const userModel = require("../models/user.model");
const authentication = require("../middlewares/auth.middleware");
const { getAllUsers, updateUser } = require("../controllers/user.controller");

const {
    validateUpdateUserMiddleWare,
} = require("../middlewares/user.middleware");

const userRouter = express.Router();

userRouter.patch(
    "/edit/:id",
    authentication,
    validateUpdateUserMiddleWare,
    updateUser
);

userRouter.get("/", getAllUsers);

module.exports = userRouter;
