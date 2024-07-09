const express = require('express');
const router = express.Router();
const Submission = require('./../models/submissionsModel');

router.get("/get-solved-problems", async (req, res) => {
    const { user_id } = req.query;

    if (!user_id) {
        return res.status(400).json({ error: "User id parameter is required" });
    }

    try {
        const solvedProblems = await Submission.find({ user_id, verdict: "Accepted" });
        res.status(200).json({
            code: 200,
            status: "success",
            data: solvedProblems,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
