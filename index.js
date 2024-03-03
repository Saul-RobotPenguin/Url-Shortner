require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");
const cors = require("cors");
const URL = require("./models/URL");
const bodyParser = require("body-parser");
const validUrl = require("valid-url");

const app = express();

app.set("view engine", "ejs");
app.use(cors());

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  //Make a .env file
  process.env.MONGODB_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Database connected!");
  }
);

app.get("/", async (req, res) => {
  res.render("index", { title: "Saul's URL Shortener" });
});

app.get("/:lid", async (req, res) => {
  const url = await URL.findOne({ shorten_id: req.params.lid });
  if (!url) {
    return res.status(500).json({ error: "Invalid Shorten URL" });
  }
  res.redirect(url.url);
});

app.post("/", async (req, res) => {
  const { url } = req.body;
  const isValid = validUrl.isUri(url);
  console.log(isValid);
  if (!isValid) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const isExists = await URL.findOne({ url: url });
  if (!isExists) {
    const newURL = new URL({
      url,
      shorten_id: shortid.generate(),
    });
    const result = await newURL.save();
    return res.send({
      shorten_url: `${process.env.HOST}${result.shorten_id}`,
    });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(
    `Server is listening at ${port} & The DataBase is also connected`
  );
});
