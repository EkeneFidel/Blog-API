const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const { getAuth } = require("firebase/auth");

// custom imports
const db = require("./config/db.config");
const articleRouter = require("./routes/article.routes");
const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");

db.connectToMongoDB();
require("dotenv").config();

PORT = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1/articles", articleRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.get("/api/v1/", (req, res) => {
    res.send("Blogging Api Sweet!");
});
app.get("/", (req, res) => {
    res.send("Blogging Api Sweet!");
});

// Handle errors.
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({ error: err.message });
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

module.exports = app;
