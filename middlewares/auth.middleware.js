const { getAuth } = require("firebase/auth");

const userModel = require("../models/user.model");

module.exports = async function authentication(req, res, next) {
    try {
        if (req.headers.authorization?.split(" ")[0] !== "Bearer") {
            return res.status(401).json({
                type: "error",
                message: "Token not a Bearer Token",
            });
        }
        const firebaseToken = req.headers.authorization?.split(" ")[1];

        let firebaseUser;
        if (firebaseToken) {
            firebaseUser = await getAuth().currentUser;
        }

        if (!firebaseUser) {
            // Unauthorized
            return res.status(401).json({
                type: "error",
                message: "Unauthorized",
            });
        }

        const user = await userModel
            .findOne({
                email: firebaseUser.email,
            })
            .select("-password");

        if (!user) {
            // Unauthorized
            return res.status(401).json({
                type: "error",
                message: "Unauthorized",
            });
        }

        req.user = user._id;

        next();
    } catch (err) {
        res.status(401).json({
            type: "error",
            message: "Unauthorized",
        });
    }
};
