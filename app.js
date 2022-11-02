const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");

// custom imports
const db = require("./configs/db.config");
const articleRouter = require("./routes/article.routes");

db.connectToMongoDB();
require("dotenv").config();

PORT = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/articles", articleRouter);
app.get("/", (req, res) => {
    res.send("Blogging Api Sweet!");
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
