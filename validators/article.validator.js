const Joi = require("joi");

const articleAddSchema = Joi.object({
    title: Joi.string().min(5).max(255).trim().required(),
    description: Joi.string().min(5).optional().trim(),
    tags: Joi.array().items(Joi.string()),
    body: Joi.string().min(10).required(),
    state: Joi.string().default("Draft"),
});

const articleUpdateSchema = Joi.object({
    title: Joi.string().min(5).max(255).trim(),
    description: Joi.string().min(5).trim(),
    tags: Joi.array().items(Joi.string()),
    body: Joi.string().min(10),
    state: Joi.string(),
});

module.exports = {
    articleAddSchema,
    articleUpdateSchema,
};
