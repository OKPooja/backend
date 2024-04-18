const mongoose = require('mongoose');

const problemSchema = mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    problem_name:{
        type: String,
        required: true,
    },
    problem_description:{
        type: String,
        required: true,
    },
    problem_difficulty:{
        type: String,
    },
    solved:{
        type: Boolean,
    },
    solution: {
      type: String,  
    },
    solution_language:{
        type: String,
    },
    bookmarked:{
        type: Boolean,
    },
    category: {
        type: String,
    },
});

module.exports = mongoose.model("problems-list", problemSchema);