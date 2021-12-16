const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const Login = require('../models/userDetailsSchema');
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

//Authenticate user
router.post('/user-auth', (req, res) => {
    console.log('Login API');
    console.log(req.headers.email, req.headers.password);
    //Generate hash value of the password  for authentication
    req.headers.password = crypto.createHash("sha256").update(req.headers.password, "binary").digest("hex");
    Login.find({
        email: req.headers.email,
        password: req.headers.password
    })
        .then((results) => {
            console.log(results.length);
            if (results.length == 0) {
                res.status(403).json({ message: 'Unauthorized user' });
            } else {
                res.status(200).json({ message: 'User authentication successful' });
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Internal Server Error',
            });
        });
});

module.exports = router;