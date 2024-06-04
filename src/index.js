const express = require('express');
const app = express();
app.use(express.json());

require('dotenv').config();
const mongoURI = process.env.mongo_uri;
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongoose connected");
  })
  .catch(error => {
    console.error("Mongoose connection error:", error);
  });

const authRoute = require('./routes/auth.js');
app.use("", authRoute);

const problemsRoute = require('./routes/problems.js');
app.use("", problemsRoute);

const markSolvedRoute = require('./routes/markSolved.js');
app.use("", markSolvedRoute);

const markBookmarkedRoute = require('./routes/markBookmarked.js');
app.use("", markBookmarkedRoute);

app.get("/", (req, res) => {
  res.send("API Works!");
});

module.exports = app;
