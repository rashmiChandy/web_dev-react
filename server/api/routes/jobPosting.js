// @Author: Rashmi Chandy 
// Feature: Job Posting Management - Get,Add,Update,Delete New Job
const express = require('express');
const router = express.Router();
const JobPostingModel = require('../models/jobPostingSchema');

router.post('/addJob', (req, res) => {
    console.log(req.body)
    try{
        const jobPosting = new JobPostingModel({
        
            course: req.body.course,
            position:req.body.position,
            hourlyRate: req.body.hourlyRate,
            duties:req.body.duties,
            totalHours:req.body.totalHours
                
            });
            jobPosting.save().then((results) => {
                    res.status(200).json({
                        message: 'Job created sucessfully',
                        result: results
                    });
                }).catch((err) => {
                    res.status(500).json({
                        message: 'Internal Server Error',
                        error: err
                    });
          
                    })
    }
    catch(error){
        return res.status(500).json(
          {
            success: false,
            message:"Internal Server Error occurred while adding new job"
          })
      }

   
})

// Get job posting based on course
router.get('/getPosting/:courseId', (req, res) => {
  const courseId =req.params.courseId
  try{

    JobPostingModel.find({course:courseId}).then((filteredPostings)=>{
      if(filteredPostings && filteredPostings.length > 0){
        return res.status(200).json(
          {
            success: true,
            jobPostings:filteredPostings
          })
      }
      return res.status(404).json(
        {
          success: false,
          jobPostings:[],
          message:"No Job Postings Available for this course",
        })
      
    }). catch((error)=>{
      return res.status(500).json(
        {
          success: false,
          jobPostings:[],
          message:"Internal Server Error occurred while retrieving job postings ",
          error:error
        })
    });
  
    
  }
  catch(error){
    return res.status(500).json(
      {
        success: false,
        message:"Internal Server Error occurred while retrieving job postings",
      })
  }
});

//update job posting on edit
router.put('/updatePosting/:courseId/:position', (req, res) => {
    courseId = req.params.courseId
    positionId = req.params.position
    const filter = {
        course: req.params.courseId,
        position:  req.params.position
    }

    const update = {
        duties: req.body.duties,
        hourlyRate:req.body.hourlyRate,
        totalHours:req.body.totalHours
    }
    
    JobPostingModel.findOneAndUpdate(filter, update, { new: true })
        .then((results) => {
            res.status(200).json({
                message: 'Job Posting updated successfully!',
                result:results
            });
        }).catch((err) => {
            res.status(500).json({
                message: 'Internal Server Error',
                error:err
            });
        });
});

// Delete by courseid and position id as foreign key
router.delete('/deletePosting/:courseId/:position', (req, res) => {
    const course =req.params.courseId
    const position =req.params.position
    
    try{
        JobPostingModel.findOneAndDelete({course:course,position:position}).then((result)=>{
        if(result){
          return res.status(200).json(
            {
              success: true,
              message:"Job Posting deleted",
              deletedJob:result
            })
        }
        else{
          return res.status(404).json(
            {
              success: false,
              message:"No job posting found with given input ",
            })
          }     
        
      }).catch((error)=>{
        return res.status(500).json(
          {
            success: false,
            message:"Internal Server Error occurred while deleting job posting with given inputs ",
            error:error
          })
      
      })
        
      
    }
    catch(error){
      return res.status(500).json(
        {
          success: false,
          message:"Internal Server Error occurred while deleting user",
          error:error
        })
    }
  });

module.exports = router