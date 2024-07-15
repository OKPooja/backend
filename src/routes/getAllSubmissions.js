const express = require('express');
const router = express.Router();
const Submission = require('./../models/submissionsModel');

router.get("/get-all-user-submissions", async(req, res) => {
    const {user_id, problem_id} = req.query;

    if(!user_id || !problem_id) {
        return res.status(400).json({error: "Please fill all mandatory fields"});
    }
    try {
        const submissions = await Submission.find({user_id, problem_id},);
        return res.status(200).json({
            code: 200,
            status: "success",
            data: submissions,
        });

    } catch(e) {
        return res.status(500).json({error: "Internal server error"});
    }

});

module.exports = router;