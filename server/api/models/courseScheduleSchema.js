const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseScheduleSchema = new Schema({
    termYear: {
        type: String,
        required: true
    },
    courseStartDate: {
        type: String,
        required: false
    },
    courseEndDate: {
        type: String,
        required: false
    },
    studentsRegistered: {
        type: String,
        required: false
    }
}, { timestamps: true }, { collection: 'courseSchedule' });

const CourseScheduleModel = mongoose.model('courseSchedule', courseScheduleSchema);

module.exports = CourseScheduleModel;