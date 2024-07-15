const mongoose = require('mongoose');

function getLocalTime() {
    const localDate = new Date();
    const offset = localDate.getTimezoneOffset();
    return new Date(localDate.getTime() - (offset * 60 * 1000));
}

const submissionsSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    }, 
    problem_id: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    output: {
        type: String,
    },
    language : {
        type: String,
    },
    verdict: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: getLocalTime,
    },
    time_for_execution: {
        type: Number, 
    },
}, {
    timestamps: true, 
});

const Submission = mongoose.model('Submission', submissionsSchema);

module.exports = Submission;
