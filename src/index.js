const express = require('express');
const app = express();
app.use(express.json());

require('dotenv').config();
const mongoURI = process.env.mongo_uri;
const mongoose = require('mongoose');

const bodyParser =  require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect(mongoURI).then(function(){
    console.log("Mongoose connected");

    app.get("/", function(req, res){
        res.send("API Works!");
    });
    const authRoute = require('./routes/auth.js');
    app.use("", authRoute);

    const problemsRoute = require('./routes/problems.js');
    app.use("", problemsRoute);
    
});

app.listen(5000, function(){
    console.log("Server started at PORT:5000");
});