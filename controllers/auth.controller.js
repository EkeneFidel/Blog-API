const passport = require("passport");

const userModel = require("../models/user.model");

const signupController = async (req, res, next) => {
    res.json({
        message: "Signup successful",
        user: req.user,
    });
};

const loginController = async (err, user, info) => {
    try {
        if (err) {
            return next(err);
        }
        if (!user) {
            const error = new Error("Username or password is incorrect");
            return next(error);
        }

        req.login(user, { session: false }, async (error) => {
            if (error) return next(error);

            const body = { _id: user._id, email: user.email };

            const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

            return res.json({ token });
        });
    } catch (error) {
        return next(error);
    }
};

module.exports= {
    signupController,
    loginController
}