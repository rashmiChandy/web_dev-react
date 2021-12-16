// @Author: Rashmi Chandy 
// Feature: Job Posting Management - Add New Job
const express = require('express');
const router = express.Router();
const JobPostionModel = require('../models/jobPositionSchema');

// Get job posting based on course
router.get('/getPositions', (req, res) => {
  try{

    JobPostionModel.find().then((positions)=>{
      if(positions && positions.length > 0){
        return res.status(200).json(
          {
            success: true,
            positions:positions
          })
      }
      return res.status(404).json(
        {
          success: false,
          positions:[],
          message:"No Job positions Available",
        })
      
    }). catch((error)=>{
      return res.status(500).json(
        {
          success: false,
          positions:[],
          message:"Internal Server Error occurred while retrieving job positions ",
          error:error
        })
    });
  
    
  }
  catch(error){
    return res.status(500).json(
      {
        success: false,
        message:"Internal Server Error occurred while retrieving job positions",
      })
  }
});

// Get job posting based on course
router.get('/getRate/:position', (req, res) => {
    const positionId =req.params.position
    try{
  
      JobPostionModel.findOne({position:positionId}).then((response)=>{
        if(response && Object.keys(response).length > 0){
          return res.status(200).json(
            {
              success: true,
              hourlyRate:response.hourlyRate,
            })
        }
        return res.status(404).json(
          {
            success: false,
            hourlyRate:'',
            message:"Invalid position",
          })
        
      }). catch((error)=>{
        return res.status(500).json(
          {
            success: false,
            hourlyRate:'',
            message:"Internal Server Error occurred while retrieving job position rate ",
            error:error
          })
      });
    
      
    }
    catch(error){
      return res.status(500).json(
        {
          success: false,
          message:"Internal Server Error occurred while retrieving job position rate",
        })
    }
  });
  

module.exports = router