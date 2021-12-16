const nodemailer = require('nodemailer');
const express = require('express');
const otpGenerator = require('otp-generator');
const VerifyOTP = require('../models/userDetailsSchema');
const SendEmail = require('../models/userDetailsSchema');
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

//Send email to user
router.post('/sendmail', (req, res) => {
    console.log('Send Email API');

    SendEmail.find({
        email: req.body.email,
    })
        .then((results) => {
            console.log(results.length);
            if (results.length == 1) {
                // Send mail
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'markit.dal@gmail.com',
                        pass: 'Markit@5709'
                    }
                });
                const newOTP = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false });
                const mailOptions = {
                    from: 'markit.dal@gmail.com',
                    to: req.body.email,
                    subject: 'Reset your Markit account password',
                    text: 'To authenticate, please use the following OTP: ' + newOTP
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                ////////////////////////////////////////////////////////////////
                console.log('Profile update API');
                const filter = { 'email': req.body.email };
                const update = { 'otp': newOTP };
                console.log(filter);
                console.log(update);
                //Update user profile
                SendEmail.findOneAndUpdate(filter, update, { new: true })
                    .then((results) => {
                        console.log('OTP updated successfully!');
                    }).catch((err) => {
                        console.log('OTP update error!');
                    });
                ////////////////////////////////////////////////////////////////

                res.status(200).json({ message: 'Email sent to the user' });
            } else {
                res.status(404).json({ message: 'User email not found' });
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Internal Server Error',
            });
        });
});

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