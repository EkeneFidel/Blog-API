const express = require("express");
const articleModel = require("../models/article.model");
const articleController = require("../controllers/article.controller");
const authentication = require("../middlewares/auth.middleware");
const {
    addArticleMiddleware,
    updateArticleiddleware,
} = require("../middlewares/article.middleware");

const articleRouter = express.Router();

articleRouter.get("/", articleController.getPublishedArticles);
articleRouter.get(
    "/my-articles",
    authentication,
    articleController.getArticlesByUser
);
articleRouter.post(
    "/post",
    authentication,
    addArticleMiddleware,
    articleController.postArticle
);
articleRouter.get("/:id", authentication, articleController.getArticleById);
articleRouter.patch(
    "/edit/:id",
    authentication,
    updateArticleiddleware,
    articleController.updateArticle
);
articleRouter.delete(
    "/delete/:id",
    authentication,
    articleController.deleteArticle
);

module.exports = articleRouter;
