const express = require('express');
const router = express.Router();
const Problems = require('./../models/problemsModel.js');
const mongoose = require('mongoose');

router.get("/problems", async function(req, res){
    try {
        const docs = await find('problems-list', {category: req.query.category});
        res.json(docs);
    } catch (error) {
        console.error("Error fetching problems:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

async function find (name, query) {
    
    const collection = await mongoose.connection.db.collection(name);
    const docs = await collection.find(query).toArray();
    return docs;
  
}

module.exports = router;