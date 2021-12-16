const mongoose = require('mongoose');
const schema = mongoose.Schema;

const scheduleInterviewSchema = new mongoose.Schema(
    {
        interviewDateAndTime: {
            type: Date,
            required: true
        },
        course: {
            type: String,
            required: true
        },
        applicantId: {
            type: String,
            required: true
        },
        hirerId: {
            type: String,
            required: true
        },
        applicantEmail: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true
        }
    }, { timestamps: true }
);

const scheduleinterview = mongoose.model('scheduleinterview', scheduleInterviewSchema);

module.exports = scheduleinterview;