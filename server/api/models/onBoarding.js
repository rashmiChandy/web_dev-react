const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const onBoardingSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    province: {
        type: String,
        required: false
    },
    sin: {
        type: String,
        required: false
    },
    accountName: {
        type: String,
        required: false
    },
    accountNumber: {
        type: String,
        required: false
    },
    bankName: {
        type: String,
        required: false
    },
    beneficiaryEmail: {
        type: String,
        required: false
    },
    bankBranchCode: {
        type: String,
        required: false
    },
    bankPhone: {
        type: String,
        required: false
    }
}, { timestamps: true }, { collection: 'onboarding' });

const OnBoardingModel = mongoose.model('onboarding', onBoardingSchema);

module.exports = OnBoardingModel;