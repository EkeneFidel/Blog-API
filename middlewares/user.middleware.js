const {
    addUserValidator,
    updateUserValidator,
} = require("../validators/user.validator");

const validateAddUserMiddleWare = async (req, res, next) => {
    const userPayload = req.body;
    try {
        await addUserValidator.validateAsync(userPayload);
        next();
    } catch (error) {
        return res.status(406).json({
            type: "error",
            message: error.message.replace(/"|'/g, ""),
        });
    }
};

const validateUpdateUserMiddleWare = async (req, res, next) => {
    const userPayload = req.body;
    try {
        await updateUserValidator.validateAsync(userPayload);
        next();
    } catch (error) {
        return res.status(406).json({
            type: "error",
            message: error.message.replace(/"|'/g, ""),
        });
    }
};

module.exports = { validateAddUserMiddleWare, validateUpdateUserMiddleWare };
