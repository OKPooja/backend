const express = require('express');
const router = express.Router();
const Submission = require('./../models/submissionsModel');
const axios = require('axios');
const TestCase = require('./../models/tcModel');

router.post("/code-submit", async (req, res) => {
    const { user_id, problem_id, code, language } = req.body;

    try {
        if (!user_id || !problem_id || !code || !language) {
            return res.status(400).json({
                code: 400,
                status: "failure",
                message: "Please fill all mandatory fields"
            });
        }
        console.log("Reached here");
        const { overallVerdict, results, output } = await executeCode(code, problem_id, language);
        // console.log(overallVerdict);
        // console.log(output);
        // console.log(results);
       

        const newSubmission = new Submission({
            user_id,
            problem_id,
            code,
            output,
            language,
            verdict: overallVerdict,
            time_for_execution: null,
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



async function executeCode(code, problem_id, language) {
    try {
        const testCases = await TestCase.find({ problem_id });
        const results = [];
        let overallVerdict = 'Accepted';
        let output;

        for (const testCase of testCases) {
            const { input, output: expectedOutput } = testCase;
            // console.log("Test");
            // console.log(input);
            // console.log(expectedOutput);

            const response = await axios.post('http://16.171.31.213/run-code', {
                code,
                input,
                language
            });

            const actualOutput = response.data.output; 
            if(actualOutput.includes('Compilation Error')) {
                overallVerdict = 'Compilation Error';
                output = actualOutput;
                results.push({ verdict: overallVerdict, actualOutput, expectedOutput });
                return { overallVerdict, results, output };
            } 
            if(actualOutput.includes('Runtime Error')) {
                overallVerdict = 'Runtime Error';
                output = actualOutput;
                results.push({ verdict: overallVerdict, actualOutput, expectedOutput });
                return { overallVerdict, results, output };
            } 
            if(actualOutput.includes('Time Limit Exceeded')) {
                overallVerdict = 'Time Limit Exceeded';
                output = actualOutput;
                results.push({ verdict: overallVerdict, actualOutput, expectedOutput });
                return { overallVerdict, results, output };
            } 
            const verdict = actualOutput.trim() === expectedOutput.trim() ? 'Accepted' : 'Failed';
            output = actualOutput;
            if(verdict == 'Failed') {
                overallVerdict = 'Wrong Answer';
                output = `Expected output: ${expectedOutput.trim()}. Your Output: ${actualOutput.trim()}`;
                results.push({ verdict: verdict, actualOutput, expectedOutput });
                return { overallVerdict, results, output };
            }

            results.push({ verdict, actualOutput, expectedOutput });
        }
        output = 'OK all test cases.'
        return { overallVerdict, results, output };
    } catch (error) {
        console.error('Error executing code:', error);
        throw new Error('Code execution failed');
    }
}

module.exports = executeCode;
module.exports = router;
