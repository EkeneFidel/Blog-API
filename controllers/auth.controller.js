const { FirebaseError } = require("@firebase/util");
const {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} = require("firebase/auth");
const { auth } = require("../config/firebase.config");

const userModel = require("../models/user.model");

async function loginController(req, res, next) {
    try {
        const userPayload = {
            email: req.body.email,
            password: req.body.password,
        };
        if (!userPayload.email || !userPayload.password) {
            return res.status(401).json({
                message: "Email and Password are required",
            });
        }
        const userData = await userModel
            .findOne({ email: userPayload.email })
            .select(["-password", "-__v"]);
        const passw = await userModel
            .findOne({ email: userPayload.email })
            .select(["password"]);

        const user = await signInWithEmailAndPassword(
            auth,
            userPayload.email,
            userPayload.password
        );

        if (user && userData) {
            const tokenId = await getAuth().currentUser.getIdToken();
            const validate = await passw.isValidPassword(userPayload.password);
            if (!validate) {
                return res.status(403).json({
                    type: "error",
                    message: "Incorrect Password",
                });
            }

            return res.status(200).json({
                type: "Success",
                message: "Login successful",
                userData,
                tokenId,
            });
        } else {
            return res.status(401).json({
                type: "error",
                message: "user doesn't exist",
            });
        }
    } catch (error) {
        console.log(error);
        if (error instanceof FirebaseError) {
            if (error.code == "auth/user-not-found") {
                return res.status(404).json({
                    type: "error",
                    message: "User not found",
                });
            } else if (error.code == "auth/wrong-password") {
                return res.status(403).json({
                    type: "error",
                    message: "Incorrect Password",
                });
            } else {
                return res.status(403).json({
                    type: "error",
                    message: error.message,
                });
            }
        } else {
            return res.status(404).json({
                type: "error",
                message: error.message,
            });
        }
    }
}

async function signupController(req, res, next) {
    try {
        const userPayload = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: req.body.password,
        };

        if (!userPayload.email || !userPayload.password) {
            return res.status(401).json({
                message: "Email and Password are required",
            });
        }
        const userExist = await userModel.findOne({
            email: userPayload.email,
            userName: userPayload.userName,
        });
        if (userExist) {
            return res.status(400).send({
                type: "error",
                message: "User already exists",
            });
        }

        const userResponse = await createUserWithEmailAndPassword(
            auth,
            userPayload.email,
            userPayload.password
        );

        if (userResponse) {
            newUser = await userModel.create({
                email: userPayload.email,
                firstName: userPayload.firstName,
                lastName: userPayload.lastName,
                userName: userPayload.userName,
                password: userPayload.password,
            });
        }
        return res.status(200).json({
            type: "Success",
            message: "Signup successful",
            user: {
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                userName: newUser.userName,
                email: newUser.email,
                created: newUser.created,
            },
        });
    } catch (error) {
        return res.status(404).json({
            type: "error",
            message: error["message"],
        });
    }
}

module.exports = {
    signupController,
    loginController,
};
