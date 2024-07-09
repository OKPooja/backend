const express = require('express');
const router = express.Router();
const TestCase = require('./../models/tcModel');
const fs = require('fs/promises');

async function uploadTestCases() {
    try {
        const problem_id = "New Problem";
        const inputData = await fs.readFile("C:/Users/ADMIN/StudioProjects/backend/src/routes/test_case.txt", "utf-8");
        const outputData = await fs.readFile("C:/Users/ADMIN/StudioProjects/backend/src/routes/output.txt", "utf-8");
        input = inputData.replace(/\r/g, '').trim();
        output = outputData.replace(/\r/g, '').trim();
        console.log(input);
        console.log(output);
    
        const newTestCase = new TestCase({
            problem_id,
            input,
            output,
        });
        await newTestCase.save();

        console.log("Test case uploaded successfully.");
    } catch(error) {
        console.error("Error uploading test case:", error);
    }
}
uploadTestCases();

module.exports = router;