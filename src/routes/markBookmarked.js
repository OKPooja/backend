const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get("/problems/bookmarked", async function(req, res){
    try {
        const problem_name = req.query.problem_name;
        const result = await toggleBookMarkedStatus(problem_name);
        res.json(result);
    } catch (error) {
        console.error("Error toggling status:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

async function toggleBookMarkedStatus(problem_name) {
    const collection = await mongoose.connection.db.collection('problems-list');
    const filter = { problem_name: problem_name };
    const problem = await collection.findOne(filter);

    if (!problem) {
        throw new Error("Problem not found");
    }

    const update = !problem.bookmarked;
    const updateDoc = {
        $set: {
            bookmarked: update
        }
    };

    const result = await collection.updateOne(filter, updateDoc);
    return { code: 200, status: "success",  problem_name: problem_name, bookmarked: update, data: result, message: "Value updated successfully" };
}

module.exports = router;
