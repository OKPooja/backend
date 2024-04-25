const express = require('express');
const router = express.Router();
const Problems = require('./../models/problemsModel.js');
const mongoose = require('mongoose');

router.get("/problems/solved", async function(req, res){
    try {
        const problem_name = req.query.problem_name;
        const result = await toggleProblemStatus(problem_name);
        res.json(result);
    } catch (error) {
        console.error("Error toggling problem status:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

async function toggleProblemStatus(problem_name) {
    const collection = await mongoose.connection.db.collection('problems-list');
    const filter = { problem_name: problem_name };
    const problem = await collection.findOne(filter);
    console.log(problem_name);

    if (!problem) {
        throw new Error("Problem not found");
    }

    const updatedSolved = !problem.solved;
    const updateDoc = {
        $set: {
            solved: updatedSolved
        }
    };

    const result = await collection.updateOne(filter, updateDoc);
    return { code: 200, status: "success",  problem_name: problem_name, solved: updatedSolved, data: result, message: "Value updated successfully" };
}

module.exports = router;
