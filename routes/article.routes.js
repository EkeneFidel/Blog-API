const express = require("express");
const passport = require("passport");
const articleModel = require("../models/article.model");
const articleController = require("../controllers/article.controller");

const articleRouter = express.Router();

articleRouter.get("/", articleController.getPublishedArticles);
articleRouter.get("/my-articles", passport.authenticate("jwt", { session: false }), articleController.getArticlesByUser);
articleRouter.post("/post", passport.authenticate("jwt", { session: false }), articleController.postArticle);
articleRouter.get("/:id", articleController.getArticleById);
articleRouter.put("/edit/:id", passport.authenticate("jwt", { session: false }), articleController.updateArticle);
articleRouter.delete("/delete/:id", passport.authenticate("jwt", { session: false }), articleController.deleteArticle);

module.exports = articleRouter;
