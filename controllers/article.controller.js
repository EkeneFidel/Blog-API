const { json } = require("body-parser");
const jwt = require("jsonwebtoken");
const express = require("express");
const moment = require("moment");
const articleModel = require("../models/article.model");
const userModel = require("../models/user.model");
require("dotenv").config();

async function getArticlesByUser(req, res) {
    try {
        const { query } = req;

        const { state, page = 0, per_page = 20 } = query;

        const findQuery = {};

        if (state) {
            findQuery.state = state;
        }
        const article = await articleModel
            .find(findQuery)
            .where("author")
            .equals(req.user)
            .skip(page)
            .limit(per_page);
        return res.status(200).json({
            type: "Success",
            article,
        });
    } catch (error) {
        // console.log(error);
        return res.status(404).json({
            type: "error",
            message: "Unable to get articles",
        });
    }
}

async function getPublishedArticles(req, res) {
    try {
        const { query } = req;

        const {
            tags,
            author,
            title,
            order = "asc",
            order_by = "createdAt",
            page = 0,
            per_page = 20,
        } = query;

        const findQuery = {};
        const sortQuery = {};

        if (author) {
            const user = await userModel.findOne({ userName: author });
            findQuery.author = user._id;
        }

        if (tags) {
            const arr = tags.split(",");
            findQuery.tags = { $in: arr };
        }

        if (title) {
            findQuery.title = title;
        }

        const sortAttributes = order_by.split(",");

        for (const attribute of sortAttributes) {
            if (order === "asc" && order_by) {
                sortQuery[attribute] = 1;
            }

            if (order === "desc" && order_by) {
                sortQuery[attribute] = -1;
            }
        }

        const articles = await articleModel
            .find(findQuery)
            .where("state")
            .equals("Published")
            .populate("author", "-password")
            .sort(sortQuery)
            .skip(page)
            .limit(per_page);
        res.status(200).json({
            type: "success",
            count: articles.length,
            articles,
        });
    } catch (error) {
        return res.status(404).json({
            type: "error",
            message: "Unable to get published articles",
        });
    }
}

async function postArticle(req, res) {
    try {
        const article = req.body;
        article.timestamp = new Date();
        article.author = req.user;
        article.reading_time = Math.ceil(
            (article.title.split.length + article.body.split.length) / 200
        );
        newArticle = await articleModel.create(article);
        return res.status(200).json({
            type: "Success",
            message: "Article posted successfully",
            newArticle,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                type: "error",
                message: "Article with this title exists",
            });
        } else {
            return res.status(500).json({
                type: "error",
                message: "Unable to post article",
            });
        }
    }
}

async function getArticleById(req, res) {
    const id = req.params.id;
    try {
        const article = await articleModel
            .findById({ _id: id })
            .where("status")
            .equals("Published")
            .populate("author", "-password");

        article.read_count++;
        article.save({ timestamps: false });
        if (!article) {
            res.status(404).json({
                type: "error",
                message: "Article not found",
            });
        } else {
            res.status(200).json({
                type: "Success",
                article,
            });
        }
    } catch (err) {
        res.status(404).json({
            type: "error",
            message: "Article not found",
        });
    }
}

async function updateArticle(req, res) {
    try {
        const id = req.params.id;
        const userId = req.user;
        const article = req.body;

        const articleToEdit = await articleModel.findById({ _id: id });

        if (userId._id.toString() === articleToEdit.author.toString()) {
            try {
                const updatedArticle = await articleModel.findOneAndUpdate(
                    { _id: id },
                    article,
                    { new: true }
                );
                return res.status(200).json({
                    type: "success",
                    message: "Article updated successfully",
                    updatedArticle,
                });
            } catch (error) {
                return res.status(500).json({
                    type: "error",
                    message: "Something went wrong please try again",
                });
            }
        } else {
            return res.status(401).json({
                type: "error",
                message: "You are not allowed to update this article",
            });
        }
    } catch (error) {
        return res.status(404).json({
            type: "error",
            message: "Article does not exist",
        });
    }
}

async function deleteArticle(req, res) {
    try {
        const id = req.params.id;
        const userId = req.user;
        if (!id) {
            res.status(200).json({ message: "This article does not exist" });
        }

        const articleTodelete = await articleModel.findById({ _id: id });

        if (userId._id.toString() === articleTodelete.author.toString()) {
            const article = await articleModel.findOneAndRemove({ _id: id });
            return res.status(200).json({
                type: "Success",
                message: "Article Deleted",
            });
        }
    } catch (error) {
        return res.status(404).json({
            type: "error",
            message: "Article not found",
        });
    }
}

module.exports = {
    getPublishedArticles,
    postArticle,
    getArticleById,
    updateArticle,
    getArticlesByUser,
    deleteArticle,
};
