const mongoose = require('mongoose');
const schema = mongoose.Schema;

const registrationSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        otp: {
            type: String,
            required: false
        }
    }, { timestamps: true }
);

const registration = mongoose.model('userdetails', registrationSchema);

module.exports = registration;