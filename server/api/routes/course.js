const express = require('express')
const router = express.Router();
const CourseModel = require("../models/courseSchema");

//Get all courses
router.get('/', (req, res) => {
    try {
        CourseModel.find().then((result) => {
            if (result && result.length > 0) {
                return res.status(200).json(
                    {
                        success: true,
                        message: "Courses retrieved",
                        courses: result
                    })
            }
            return res.status(404).json(
                {
                    success: false,
                    message: "No courses found",
                })

        }).catch((error) => {
            return res.status(500).json(
                {
                    success: false,
                    message: "Internal Server Error occurred while retrieving courses",
                    error: error
                })
        });
    }
    catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Internal Server Error occurred while retrieving courses",
            })
    }
});


// Insert new course 
router.post('/add', (req, res) => {
    const courseId = req.body.courseId;
    const courseName = req.body.courseName;
    try {
        CourseModel.find({ courseId: courseId }).then((filteredCourse) => {
            if (filteredCourse && filteredCourse.length > 0) {
                return res.status(500).json(
                    {
                        success: false,
                        message: "Course ID already exists: " + courseId
                    })
            }
            else {
                const newCourse = new CourseModel({ courseId: courseId, courseName: courseName });
                newCourse.save().then((result) => {
                    return res.status(200).json(
                        {
                            success: true,
                            message: "Course added with ID: " + courseId
                        })
                }).catch((error) => {
                    return res.status(500).json(
                        {
                            success: false,
                            message: "Internal Server Error occurred while inserting new course",
                            error: error.message
                        })
                });
            }
        }).catch((error) => {
            return res.status(500).json(
                {
                    success: false,
                    message: "Internal Server Error occurred while inserting the course id ",
                    error: error
                })
        })
    }
    catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Internal Server Error occurred while inserting new course",
            });
    }
});

// Update the course 
router.put('/update/:id', (req, res) => {
    const id = req.params.id

    try {
        // Invalid request
        if (!req.body.courseId && !req.body.courseName) {
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


        CourseModel.findOneAndUpdate({ _id: id }, query, { new: true }).then((result) => {
            if (result) {
                return res.status(200).json(
                    {
                        success: true,
                        message: "Course updated",
                        updatedResult: result
                    })
            }
            else {
                return res.status(404).json(
                    {
                        success: false,
                        message: "No course found with id " + id,
                    })
            }

        }).catch((error) => {
            return res.status(500).json(
                {
                    success: false,
                    message: "Internal Server Error occurred while updating course with id " + id,
                    error: error
                })

        })


    }
    catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Internal Server Error occurred while updating course",
                error: error
            })
    }
});

// Delete course by Id
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id

    try {

        CourseModel.findOneAndDelete({ _id: id }).then((result) => {
            if (result) {
                return res.status(200).json(
                    {
                        success: true,
                        message: "Course deleted",
                        deletedUser: result
                    })
            }
            else {
                return res.status(404).json(
                    {
                        success: false,
                        message: "No course found with id " + id,
                    })
            }

        }).catch((error) => {
            return res.status(500).json(
                {
                    success: false,
                    message: "Internal Server Error occurred while deleting course with given id " + id,
                    error: error
                })

        })


    }
    catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Internal Server Error occurred while deleting course",
                error: error
            })
    }
});

module.exports = router;