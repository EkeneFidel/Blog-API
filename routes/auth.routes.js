const express = require("express");
const { FirebaseError } = require("@firebase/util");

const userModel = require("../models/user.model");
const {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} = require("firebase/auth");

const {
    signupController,
    loginController,
} = require("../controllers/auth.controller");
const { validateAddUserMiddleWare } = require("../middlewares/user.middleware");

const authRouter = express.Router();

authRouter.post("/login", loginController);

authRouter.post("/signup", validateAddUserMiddleWare, signupController);

module.exports = authRouter;
