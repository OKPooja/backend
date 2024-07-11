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
        const { overallVerdict, results } = await executeCode(code, problem_id, language);
        console.log(overallVerdict);
       

        const newSubmission = new Submission({
            user_id,
            problem_id,
            code,
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
            if (actualOutput.includes('Compilation Error') || actualOutput.includes('Runtime Error') || actualOutput.includes('Time Limit Exceeded')) {
                overallVerdict = actualOutput; 
                results.push({ verdict: actualOutput, actualOutput, expectedOutput });
                return { overallVerdict, results };
            }
        
            const verdict = actualOutput.trim() === expectedOutput.trim() ? 'Accepted' : 'Failed';
            if(verdict == 'Failed') {
                overallVerdict = 'Wrong Answer';
                results.push({ verdict: actualOutput, actualOutput, expectedOutput });
                return { overallVerdict, results };
            }

            results.push({ verdict, actualOutput, expectedOutput });
        }

        return { overallVerdict, results };
    } catch (error) {
        console.error('Error executing code:', error);
        throw new Error('Code execution failed');
    }
}

module.exports = executeCode;
module.exports = router;
