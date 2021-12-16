const express = require('express')
const router = express.Router();
const HireAssistantModel = require("../models/hireAssistantSchema");

//Get all new hires
router.get('/', (req, res) => {
    try {
        HireAssistantModel.find().then((result) => {
            if (result && result.length > 0) {
                return res.status(200).json(
                    {
                        success: true,
                        message: "New hires retrieved",
                        hires: result
                    })
            }
            return res.status(200).json(
                {
                    success: false,
                    message: "No hires found",
                    hires: ""
                })

        }).catch((error) => {
            return res.status(500).json(
                {
                    success: false,
                    message: "Internal Server Error occurred while retrieving hires",
                    error: error
                })
        });
    }
    catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Internal Server Error occurred while retrieving hires"
            })
    }
});


// Insert new hires
router.post('/add', (req, res) => {
    try {
        const newHire = new HiresModel({ courseScheduleId: req.body.courseScheduleId, 
            hireId: req.body.hireId, fname: req.body.fname, lname: req.body.lname, email: req.body.email,
            type: req.body.type, 
            status: req.body.status });

        newHire.save().then((result) => {
            return res.status(200).json(
                {
                    success: true,
                    message: "Hire added for: " + req.body.hireId
                })
        }).catch((error) => {
            return res.status(500).json(
                {
                    success: false,
                    message: "Internal Server Error occurred while inserting new hire",
                    error: error.message
                })
        });
    }
    catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Internal Server Error occurred while inserting new hire",
            });
    }
});

// Update the hire 
router.put('/update/:id', (req, res) => {
    const hireId = req.params.hireId

    try {
        // Invalid request
        if (!req.body.fname && !req.body.lname) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Bad request, Missing input body",
                })
        }
        var query = {};

        for (var key in req.body) {
            query[key] = req.body[key];
        }

        HireAssistantModel.findOneAndUpdate({ hireId: hireId }, query, { new: true }).then((result) => {
            if (result) {
                return res.status(200).json(
                    {
                        success: true,
                        message: "Hire info updated",
                        updatedResult: result
                    })
            }
            else {
                return res.status(404).json(
                    {
                        success: false,
                        message: "No hire found with id " + hireId,
                    })
            }

        }).catch((error) => {
            return res.status(500).json(
                {
                    success: false,
                    message: "Internal Server Error occurred while updating hire with id " + id,
                    error: error
                })
        })
    }
    catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Internal Server Error occurred while updating hire",
                error: error
            })
    }
});

// Delete hire by hireId
router.delete('/delete/:id', (req, res) => {
    const id = req.params.hireId

    try {
        HireAssistantModel.findOneAndDelete({ hireId: id }).then((result) => {
            if (result) {
                return res.status(200).json(
                    {
                        success: true,
                        message: "Hire info deleted",
                        deletedUser: result
                    })
            }
            else {
                return res.status(404).json(
                    {
                        success: false,
                        message: "No hire found with id " + hireId,
                    })
            }

        }).catch((error) => {
            return res.status(500).json(
                {
                    success: false,
                    message: "Internal Server Error occurred while deleting hire with given id " + id,
                    error: error
                })
        })
    }
    catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Internal Server Error occurred while deleting hire",
                error: error
            })
    }
});
 
module.exports = router;