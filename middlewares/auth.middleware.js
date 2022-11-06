const passport = require("passport");

const {
    jwtStrategy,
    loginStrategy,
    signupStrategy,
} = require("../strategies/auth.strategy");

passport.use(jwtStrategy);

passport.use("signup", signupStrategy);
passport.use("login", loginStrategy);
