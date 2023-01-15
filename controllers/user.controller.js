const express = require("express");

const userModel = require("../models/user.model");
async function getAllUsers(req, res, next) {
    try {
        const users = await userModel.find().select(["-password", "-__v"]);

        return res.status(200).json({
            type: "Success",
            users,
        });
    } catch (error) {
        return res.status(500).json({
            type: "error",
            message: "An error occured",
        });
    }
}

async function updateUser(req, res, next) {
    try {
        const id = req.params.id;
        const userId = req.user;
        const userData = req.body;

        const userToEdit = await userModel.findById({ _id: id });

        if (userToEdit) {
            const updatedUser = await userModel
                .findOneAndUpdate({ _id: id }, userData, { new: true })
                .select(["-password", "-__v"]);
            return res.status(200).json({
                type: "success",
                message: "User updated successfully",
                updatedUser,
            });
        } else {
            return res.status(404).json({
                type: "error",
                message: "User does not exist",
            });
        }
    } catch (error) {
        {
            console.log(error);
            return res.status(500).json({
                type: "error",
                message: "An error occured",
            });
        }
    }
}

module.exports = {
    getAllUsers,
    updateUser,
};
