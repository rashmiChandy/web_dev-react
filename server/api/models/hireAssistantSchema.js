const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hireAssistantSchema = new Schema({
    courseScheduleId: {
        type: String,
        required: true
    },
    hireId: {
        type: String,
        required: false
    },
    fname: {
        type: String,
        required: false
    },
    lname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    },
}, { timestamps: true }, { collection: 'hires' });

const HireAssistantModel = mongoose.model('hires', hireAssistantSchema);

module.exports = HireAssistantModel;