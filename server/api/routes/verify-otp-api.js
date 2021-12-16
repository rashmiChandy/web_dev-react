const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const VerifyOTP = require('../models/userDetailsSchema');
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

//Authenticate user
router.post('/verify-otp', (req, res) => {
    console.log('Verify OTP API');

    VerifyOTP.find({
        email: req.body.email,
        otp: req.body.otp
    })
        .then((results) => {
            console.log(results.length);
            if (results.length == 0) {
                res.status(400).json({ message: 'Invalid OTP' });
            } else {
                res.status(200).json({ message: 'Verified OTP' });
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Internal Server Error',
            });
        });
});

module.exports = router;