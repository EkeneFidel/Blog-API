const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

// Define user schema
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const UserModel = mongoose.model("Users", UserSchema);
module.exports = UserModel;
