const express = require('express');
const router = express.Router();
const Problems = require('./../models/problemsModel');

//Fetch all problems route
router.get("/problems", async function(req, res){
    //var problems = await Problems.find({type: req.type});
    res.json(problems);
});


