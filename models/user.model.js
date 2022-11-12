const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

// Define a schema
const Schema = mongoose.Schema;

// Define user schema
const userSchema = new Schema({
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
        unique: true,
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
    created : {
        type: Date,
        default: Date.now
    }
});

userSchema.pre("save", async function (next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
});

userSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
};

const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;
