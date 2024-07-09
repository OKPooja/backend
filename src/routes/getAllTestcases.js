const express = require('express');
const router = express.Router();
const TestCase = require('./../models/tcModel');

router.get("/get-testcases", async (req, res) => {
    try {
        const testCases = await TestCase.find();
        console.log("All Test Cases:", testCases);
        res.status(200).json({
            code: 200,
            status: "success",
            data: testCases,
        });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;