const mongoose = require('mongoose');

const TestCasesSchema = mongoose.Schema({
    problem_id: {
        type: String,
        required: true,
    },
    input: {
        type: String,
        required: true,
    },
    output: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("testcases", TestCasesSchema);