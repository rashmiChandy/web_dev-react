const express = require('express');
const bodyParser = require('body-parser');
const user = require('../models/userDetailsSchema');
const router = express.Router();
const courseModel = require("../models/courseSchema");
const jobOffersSchema = require('../models/jobOffersSchema');
const JobPostingModel = require('../models/jobPostingSchema');
const scheduleInterview = require('../models/scheduleInterviewSchema');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.post('/hire-assistant', (req, res) => {
    jobOffersSchema.find({
        email: req.body.email,
        course: req.body.course,
        jobPosition: req.body.jobPosition,
        hirerId: req.body.hirerId,
        status: req.body.status
    })
        .then((results) => {
            // console.log(results.length);
            if (results.length == 0) {
                const jobOffer = new jobOffersSchema(req.body);
                jobOffer.save()
                    .then((results) => {
                        res.status(200).json({
                            message: 'Invitation sucessful',
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
                res.status(400).json({ message: 'Hire request already sent.' });
            }
        }).catch((err) => {
            // console.log(err);
            res.status(500).json({
                message: 'Internal Server Error',
                result: results
            });
        });
});

router.get('/check-user', (req, res) => {
    const filter = {
        email: req.query.email
    }
    user.find(filter)
        .then((results) => {
            // console.log(results);
            if (results && results.length > 0) {
                return res.status(200).json(
                    {
                        success: true,
                        message: "User Found",
                        applicants: results
                    })
            } else {
                res.status(404).json({
                    success: true,
                    message: "No user found with email specified.",
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

// get job offers for user with given id.
//  The job offer API fetches additional job details from job posting table to display the final Job offer
router.get('/jobOffers/:emailId', (req, res) => {
    const emailId =req.params.emailId;
    try{
        courseModel.find().then(items=>{
            //list of all courses
            let courseList = items
        
            jobOffersSchema.find({applicantEmail:emailId}).then((jobOffer)=>{
                if(jobOffer && jobOffer.length > 0){
                    JobPostingModel.find().then((jobs) => {
                        return res.status(200).json({
                            success: true, 
                            jobs:jobs,
                            jobOffers:jobOffer,
                            courses:courseList
                        })
                        
                    })
                }
                else return res.status(404).json({
                    success: false,
                    message:"No jobs offered for user with id "+emailId,
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
          message:"Internal Server Error occurred while retrieving job offers","interviewDetails":[],"jobApplications":[],
          "courses":[],
        })
    }

});

// Update the job offer status flag
router.put('/update-job-offer-status', (req, res) => {
    const filter = {
        applicantEmail: req.body.email,
        course: req.body.course,
        jobPosition: req.body.position
    }

    const update = {
        status: req.body.status,
        comments:req.body.comments
    }
    
    jobOffersSchema.findOneAndUpdate(filter, update, { new: true })
        .then((results) => {
            res.status(200).json({
                message: 'Job Offer updated successfully!',
                result:results
            });
        }).catch((err) => {
            res.status(500).json({
                message: 'Internal Server Error',
                error:err
            });
        });
});

router.get('/getInterviewScheduledByCourseAndJob', (req, res) => {
    // console.log(req.query.course)
    // console.log(req.query.interviewDateAndTime)
    // console.log(req.query.jobPosition)
    const filter = {
        course: req.query.course,
        position: req.query.jobPosition,
        interviewDateAndTime: { $lt: req.query.interviewDateAndTime }
    }
    scheduleInterview.find(filter)
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
                console.log(err);
                res.status(500).json({
                    message: 'Internal Server Error',
                    result: []
                });
            });
});

        
    
module.exports = router;