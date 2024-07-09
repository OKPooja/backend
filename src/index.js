const express = require('express');
const app = express();
app.use(express.json());

require('dotenv').config();
const mongoURI = process.env.mongo_uri;
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(mongoURI,)
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

const submissionRoute = require('./routes/submission.js');
app.use("", submissionRoute);

const getSolvedProblemsRoute = require('./routes/getSolvedProblems.js');
app.use("", getSolvedProblemsRoute);

const addTestCasesRoute = require('./routes/addTcIO.js');
//app.use("", addTestCasesRoute);

const getTestCasesRoute = require('./routes/getAllTestcases.js');
app.use("", getTestCasesRoute);


app.get("/", (req, res) => {
  res.send("API Works!");
});

app.listen(5000, function(){
    console.log("Server started at PORT:5000");
});
module.exports = app;
