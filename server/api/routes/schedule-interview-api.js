const express = require('express');
const bodyParser = require('body-parser');
const scheduleInterview = require('../models/scheduleInterviewSchema');
const jobApplication = require('../models/jobApplicationSchema');
const courseModel = require("../models/courseSchema");
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.post('/schedule-interview', (req, res) => {
    scheduleInterview.find({
        applicantId: req.body.applicantId,
        hirerId: req.body.hirerId,
        course: req.body.course
    })
        .then((results) => {
            // console.log(results.length);
            if (results.length == 0) {
                const schedule = new scheduleInterview(req.body);
                schedule.save()
                    .then((results) => {
                        res.status(200).json({
                            message: 'Interview Scheduled',
                            result: results
                        });
                    }).catch((err) => {
                        // console.log(err);
                        res.status(500).json({
                            message: 'Internal Server Error',
                            result: results
                        });
                    });
            } else {
                res.status(400).json({message: 'Interview already Scheduled'});
            }
        }).catch((err) => {
            // console.log(err);
            res.status(500).json({
                message: 'Internal Server Error',
                result: results
            });
        });
});

router.put('/update-job-application-status', (req, res) => {
    const filter = {
        email: req.body.email,
        course: req.body.course,
        jobPosition: req.body.jobPosition
    }

    const update = {
        status: req.body.status
    }
    
    jobApplication.findOneAndUpdate(filter, update, { new: true })
        .then((results) => {
            res.status(200).json({
                message: 'Job application updated.',
                result:results
            });
        }).catch((err) => {
            res.status(500).json({
                message: 'Internal Server Error',
                error:err
            });
        });
});

router.get('/getApplicantsByCourseAndJob', (req, res) => {
    // console.log(req.query.course)
    // console.log(req.query.course)
    // console.log(req.query.jobPosition)
    const filter = {
        course: req.query.course,
        jobPosition: req.query.jobPosition
    }
    jobApplication.find(filter)
        .then((results) => {
                // console.log(results);
                if (results && results.length > 0) {
                    return res.status(200).json(
                        {
                            success: true,
                            message: "Applicants Found",
                            applicants: results
                        })
                } else {
                    res.status(404).json({
                        success: true,
                        message: "No Applicants Found",
                        applicants: []
                    });
                }
            }).catch((err) => {
                // console.log(err);
                res.status(500).json({
                    message: 'Internal Server Error',
                    result: []
                });
            });
});

// Get interview details of a particular user
router.get('/getInterviewScheduled/:email', (req, res) => {
    const emailId =req.params.email;
    try{
        courseModel.find().then(items=>{
            //list of all courses
            let courseList = items
        
            scheduleInterview.find({applicantEmail:emailId}).then((filteredInterview)=>{
                if(filteredInterview && filteredInterview.length > 0){
                    jobApplication.find({email:emailId}).then((applicationDetails) => {
                        return res.status(200).json({
                            success: true, 
                            interviewDetails:filteredInterview,
                            jobApplications:applicationDetails,
                            courses:courseList
                        })
                        
                    })
                }
                else return res.status(404).json({
                    success: false,
                    message:"No interviews scheduled for user with id "+emailId,
                    interviewDetails:[],
                    jobApplications:[],
                    courses:[] })
            }) 
         })
      
    }
    catch(error){
      return res.status(500).json(
        {
          success: false,
          message:"Internal Server Error occurred while retrieving interviews",
        })
    }

});


router.delete('/delete-scheduled-interview', (req, res) => {

    // console.log(req.query.applicantEmail)
    // console.log(req.query.position)
    // console.log(req.query.course)

    filter = {
        applicantEmail: req.query.applicantEmail,
        position: req.query.position,
        course: req.query.course
    }

    scheduleInterview.findOneAndDelete( filter )
        .then((results) => {
            //console.log(results);
            if (results) {
                return res.status(200).json(
                    {
                        success: true,
                        message: "Interview removed",
                        interview: results
                    })
            } else {
                res.status(400).json({message: 'Interview does not exists'});
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Internal Server Error',
                error: err
            });
        });
});

module.exports = router;