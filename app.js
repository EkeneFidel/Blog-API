const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");

// custom imports
const db = require("./config/db.config");
const articleRouter = require("./routes/article.routes");
const authRouter = require("./routes/auth.routes");


db.connectToMongoDB();
require("dotenv").config();
require("./middlewares/auth.middleware");

PORT = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/articles", articleRouter);
app.use("/auth", authRouter);
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
