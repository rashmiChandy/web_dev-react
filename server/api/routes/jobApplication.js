// @Author: Rashmi Chandy 
// Feature: Application Management

const express = require('express')
const router = express.Router()
const JobApplicationModel = require("../models/jobApplicationSchema");

// Insert new job application details 
router.post('/addApplication', (req, res) => {
  var count = 0;
  try{
      JobApplicationModel.find().then((response)=>{
      count = response.length+1

      const applicantId= "APPID"+count
      //every new application created has a unique application ID and the initial status of the submitted application is Under Review
      const newApplication = new JobApplicationModel(
          {
              applicationId:applicantId,
              status:'Under Review',
              firstName:req.body.firstName,
              lastName:req.body.lastName,
              email:req.body.email,
              course:req.body.course,
              jobPosition:req.body.jobPosition,
              degree:req.body.degree,
              program:req.body.program,
              startYear:req.body.startYear,
              endYear:req.body.endYear,
              inputFields:req.body.inputFields,
              skills: req.body.skills
            }
      )
      

      newApplication.save().then((result)=>{
        return res.status(200).json(
          {
            success: true,
            message:"Application Submitted Successfully",
            applicationId:applicantId,
            status:"Under Review"
          })
      }).catch((error)=>{
        return res.status(500).json(
          {
            success: false,
            message:"Internal Server Error occurred while inserting new application",
            error:error.message
          })
      })
      
    })
    }
    catch(error){
      return res.status(500).json(
        {
          success: false,
          message:"Internal Server Error occurred while inserting new application",
        })
    }
}); 

// Get jobs applied
router.get('/getApplications/:email', (req, res) => {
  const emailId =req.params.email
  try{

    JobApplicationModel.find({email:emailId}).then((filteredJobs)=>{
      console.log(filteredJobs);
      if(filteredJobs && filteredJobs.length > 0){
        return res.status(200).json(
          {
            success: true,
            jobApplications:filteredJobs
          })
      }
      return res.status(404).json(
        {
          success: false,
          jobApplications:[],
          message:"No Jobs Applied",
        })
      
    }). catch((error)=>{
      return res.status(500).json(
        {
          success: false,
          jobApplications:[],
          message:"Internal Server Error occurred while retrieving user with id "+inputId,
          error:error
        })
    });
  
    
  }
  catch(error){
    return res.status(500).json(
      {
        success: false,
        message:"Internal Server Error occurred while retrieving user with ID"+inputId,
      })
  }
});

 
module.exports = router;