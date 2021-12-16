const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userCheckSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: false
        }
    }, { timestamps: true }
);

const usercheck = mongoose.model('userdetails', userCheckSchema);

module.exports = usercheck;