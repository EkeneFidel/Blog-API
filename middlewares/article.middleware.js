const {
    articleAddSchema,
    articleUpdateSchema,
} = require("../validators/article.validator");

const addArticleMiddleware = async (req, res, next) => {
    const articlePayload = req.body;
    try {
        await articleUpdateSchema.validateAsync(articlePayload);
        next();
    } catch (error) {
        return res.status(406).json({
            type: "error",
            message: error.details[0].message.replace(/"|'/g, ""),
        });
    }
};

const updateArticleiddleware = async (req, res, next) => {
    const articlePayload = req.body;
    try {
        await articleUpdateSchema.validateAsync(articlePayload);
        next();
    } catch (error) {
        return res.status(406).json({
            type: "error",
            message: error.details[0].message.replace(/"|'/g, ""),
        });
    }
};

module.exports = {
    addArticleMiddleware,
    updateArticleiddleware,
};
