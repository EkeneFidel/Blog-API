const { verify } = require("jsonwebtoken");
const pasport = require("passport");
const { deleteOne } = require("../models/user.model");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const userModel = require("../models/user.model");

require("dotenv").config();

const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

const payload = {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
};

const jwtStrategy = new JwtStrategy(opts, async (token, done) => {
    try {
        return done(null, token.user);
    } catch {
        done(error);
    }
});

const signupStrategy = new LocalStrategy(
    payload,
    async (req, email, password, done) => {
        try {
            const user = await userModel.create(req.body);
            return done(null, user);
        } catch (error) {
            done(error);
        }
    }
);

const loginStrategy = new LocalStrategy(
    payload,
    async (req, email, password, done) => {
        try {
            const user = await userModel.findOne({ email });

            if (!user) {
                return done(null, false, { message: "User not found" });
            }
            const validate = await user.isValidPassword(password);

            if (!validate) {
                return done(null, false, { message: "Password Incorrect" });
            }

            return done(null, user, { message: "Logged in successfully" });
        } catch (error) {
            return done(error);
        }
    }
);

module.exports = {
    signupStrategy,
    loginStrategy,
    jwtStrategy,
};
