const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    problem: String,
    difficulty: String,
    acceptance: String
});

module.exports = mongoose.model("Problems", problemSchema);