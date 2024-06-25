const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Submission = require('./../models/submissionsModel');

router.post("/code-submit", async (req, res) => {
    const { user_id, problem_id, code, verdict, time_for_execution } = req.body;

    try {

        if(!user_id || !problem_id || !code || !verdict){
            return res.status(400).json({
                code: 400,
                status: "failure",
                message: "Please fill all mandatory fields"
            });
        }
        
        const newSubmission = new Submission({
            user_id,
            problem_id,
            code,
            verdict,
            time_for_execution: time_for_execution || null, 
        });

        await newSubmission.save();

        return res.status(200).json({
            code: 200,
            status: "success",
            message: "Submission saved successfully",
            data: newSubmission,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            status: "failure",
            message: "Internal server error",
        });
    }
});

module.exports = router;
