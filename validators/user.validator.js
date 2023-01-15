const Joi = require("joi");

const addUserValidator = Joi.object()
    .keys({
        userName: Joi.string().alphanum().required().label("Username"),
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
        confirmPassword: Joi.any()
            .equal(Joi.ref("password"))
            .label("Confirm Password")
            .messages({
                "any.only": "Confirm Password does not match Password",
            }),
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last name"),
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        }),
        createAt: Joi.date().default(Date.now()),
    })
    .with("password", "confirmPassword");

const updateUserValidator = Joi.object()
    .keys({
        userName: Joi.string().alphanum().label("Username"),
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
        confirmPassword: Joi.any()
            .equal(Joi.ref("password"))
            .label("Confirm Password")
            .messages({
                "any.only": "Confirm Password does not match Password",
            }),
        firstName: Joi.string().label("First Name"),
        lastName: Joi.string().label("Last name"),
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        }),
        createAt: Joi.date().default(Date.now()),
    })
    .with("password", "confirmPassword");

module.exports = { addUserValidator, updateUserValidator };
