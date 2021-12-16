const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseId: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: false
    }
}, { timestamps: true }, { collection: 'course' });

const CourseModel = mongoose.model('course', courseSchema);

module.exports = CourseModel;