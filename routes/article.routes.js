const express = require("express");
const articleModel = require("../models/article.model");

const articleRouter = express.Router();

articleRouter.get("/", (req, res) => {
    articleModel
        .find()
        .then((articles) => {
            res.status(200).json(articles);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
});

articleRouter.post("/", (req, res) => {
    const article = req.body;
    article.timestamp = new Date();
    article.state = "Draft";
    article.reading_time = Math.ceil(
        (article.title.split.length + article.body.split.length) / 200
    );

    articleModel
        .create(article)
        .then((article) => {
            res.status(200).send(article);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(err);
        });
});

articleRouter.get("/:title", async (req, res) => {
    const title = req.params.title;
    await articleModel
        .findOne({ title: title })
        .then((article) => {
            res.status(200).send(article);
        })
        .catch((err) => {
            console.log(err);
            res.status(404).send(err);
        });
});

articleRouter.put("/:title", (req, res) => {
    const title = req.params.title;
    const article = req.body;
    article.timestamp = new Date();
    articleModel
        .findOneAndUpdate({ title: title }, article, { new: true })
        .then((newArticle) => {
            res.status(200).send(newArticle);
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json({
                message: "Article not found",
            });
        });
});

articleRouter.delete("/:title", (req, res) => {
    const title = req.params.title;
    articleModel
        .findOneAndRemove({ title: title })
        .then((article) => {
            res.status(200).json(article);
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json({
                message: "Article not found",
            });
        });
});

module.exports = articleRouter;
