const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const Registration = require('../models/userDetailsSchema');
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

//MongoDB Add data
router.post('/add-user', (req, res) => {

    console.log('Register API');
    //Check if user exists before registration
    Registration.find({
        email: req.headers.email,
    })
        .then((results) => {

            //Creating and storing Hash value of password for security
            req.headers.password = crypto.createHash("sha256").update(req.headers.password, "binary").digest("hex");

            if (results.length == 0) {
                const register = new Registration(req.headers);
                register.save()
                    .then((results) => {
                        res.status(201).json({
                            message: 'User created successfully',
                            result: results
                        });
                    }).catch((err) => {
                        console.log(err);
                    });
            } else {
                res.status(409).json({
                    message: 'User already exists',
                });
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Internal Server Error',
            });
        });
});

module.exports = router;