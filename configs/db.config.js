const mongoose = require("mongoose");
require('dotenv').config();

function connectToMongoDB() {
    mongoose.connect(process.env.MONGO_URI);
    db = mongoose.connection;

    db.on("connected", () => {
        console.log("Connected to database successfully !");
    });

    db.on("error", (err) => {
        console.log("An error occured while connecting to the database", err);
    });
}

module.exports = { connectToMongoDB }