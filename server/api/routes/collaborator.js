const express = require('express')
const router = express.Router();
const CollaboratorModel = require("../models/collaboratorSchema");

//Get collaborator info
router.get('/:userId/:courseId', (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.params.userId;
    try {
        CollaboratorModel.find({ courseId: courseId, userId : userId }).then((result) => {
            if (result && result.length > 0) {
                return res.status(200).json(
                    {
                        success: true,
                        message: "Collaborator data retrieved",
                        collaborator: result[0]
                    })
            }
            return res.status(200).json(
                {
                    success: false,
                    message: "No Collaborator data found",
                    collaborator: ""
                })

        }).catch((error) => {
            return res.status(500).json(
                {
                    success: false,
                    message: "Internal Server Error occurred while retrieving collaborator data for user",
                    error: error
                })
        });
    }
    catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Internal Server Error occurred while retrieving collaborator data",
            })
    }
});

//Get all collaborators
router.get('/:courseId', (req, res) => {
    const courseId = req.params.courseId;
    try {
        CollaboratorModel.find({ courseId: courseId }).then((result) => {
            if (result && result.length > 0) {
                return res.status(200).json(
                    {
                        success: true,
                        message: "Collaborators data retrieved",
                        collaborators: result[0]
                    })
            }
            return res.status(200).json(
                {
                    success: false,
                    message: "No Collaborators found",
                    collaborator: ""
                })

        }).catch((error) => {
            return res.status(500).json(
                {
                    success: false,
                    message: "Internal Server Error occurred while retrieving collaborator data for course",
                    error: error
                })
        });
    }
    catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Internal Server Error occurred while retrieving collaborator data",
            })
    }
});


// Join a course 
router.post('/join', (req, res) => {
    const courseId = req.body.courseId;
    const userId = req.body.userId;
    try {
        const newCollaborator = new CollaboratorModel({ userId: userId, courseId: courseId });
        newCollaborator.save().then((result) => {
            return res.status(200).json(
                {
                    success: true,
                    message: "User " + userId + " joined: " + courseId
                });
        }).catch((error) => {
            return res.status(500).json(
                {
                    success: false,
                    message: "Internal Server Error occurred while adding the user to the course",
                    error: error.message
                })
        });

    }
    catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Internal Server Error occurred while joining the course",
            });
    }
});


// Leave a course
router.delete('/leave/:userId/:courseId', (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.params.userId;
    console.log(courseId);
    try {
        CollaboratorModel.findOneAndDelete({ courseId: courseId, userId: userId }).then((result) => {
            if (result) {
                return res.status(200).json(
                    {
                        success: true,
                        message: "User " + userId + " removed from course " + courseId,
                        deletedUser: result
                    })
            }
            else {
                return res.status(404).json(
                    {
                        success: false,
                        message: "No course details found with id " + courseId,
                    })
            }

        }).catch((error) => {
            return res.status(500).json(
                {
                    success: false,
                    message: "Internal Server Error occurred while deleting course for given user " + userId,
                    error: error
                })

        });
    }
    catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Internal Server Error occurred while deleting course",
                error: error
            });
    }
});

module.exports = router;