const express = require('express');
const bodyParser = require("body-parser");
const crypto = require('crypto');
const ProfileUpdate = require('../models/userDetailsSchema');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
const jsonParser = bodyParser.json();

//Update user profile details
router.put('/update-user', (req, res) => {
    console.log('Profile update API');
    if (req.body.password) {
        req.body.password = crypto.createHash("sha256").update(req.body.password, "binary").digest("hex");
    }
    const filter = { 'email': req.headers.email };
    const update = req.body;
    console.log(filter, update);
    //Update user profile
    ProfileUpdate.findOneAndUpdate(filter, update, { new: true })
        .then((results) => {
            res.status(200).json({
                message: 'Profile updated successfully!',
                result: results
            });
        }).catch((err) => {
            res.status(500).json({
                message: 'Internal Server Error',
            });
        });
});

//Update user profile details
router.post('/user-details', (req, res) => {
    console.log('Find Profile API');
    //Find user profile
    ProfileUpdate.find({
        email: req.body.email
    }).then((results) => {
        if (results.length == 1) {
            res.status(200).json({
                message: 'Profile retrieved successfully!',
                result: results
            });
        } else {
            res.status(404).json({
                message: 'Profile not found!'
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: 'Internal Server Error',
        });
    });
});

module.exports = router;
