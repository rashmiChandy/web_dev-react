const express = require('express')
const router = express.Router();
const CourseScheduleModel = require("../models/courseScheduleSchema");

//Get all schedule
router.get('/', (req, res) => {
    try {
        CourseScheduleModel.find().then((result) => {
            console.log(result);
            if (result && result.length > 0) {
                return res.status(200).json(
                    {
                        success: true,
                        message: "Course schedule retrieved",
                        users: result
                    })
            }
            return res.status(404).json(
                {
                    success: false,
                    message: "No schedule found",
                })

        }).catch((error) => {
            return res.status(500).json(
                {
                    success: false,
                    message: "Internal Server Error occurred while retrieving course schedule",
                    error: error
                })
        });
    }
    catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Internal Server Error occurred while retrieving course schedule",
            })
    }
});


// Insert new schedule
router.post('/add', (req, res) => {
    try {
        const newSchedule = new CourseScheduleModel({ termYear: req.body.termYear, courseStartDate: req.body.courseStartDate, courseEndDate: req.body.courseEndDate, studentsRegistered: req.body.studentsRegistered });
        newSchedule.save().then((result) => {
            return res.status(200).json(
                {
                    success: true,
                    message: "Course Schedule added for term: " + req.body.termYear
                })
        }).catch((error) => {
            return res.status(500).json(
                {
                    success: false,
                    message: "Internal Server Error occurred while inserting new course schedule",
                    error: error.message
                })
        });
    }
    catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Internal Server Error occurred while inserting new course schedule",
            });
    }
});
 
module.exports = router;