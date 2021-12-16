// @Author: Ananthi Thiagarajan Subashini 
// Feature: OnBoarding Process

const express = require('express')
const router = express.Router()
const OnBoardingModel = require("../models/onBoarding");


router.get('/onboard', (req, res) => {
    
    res.status(200).json({
        message: "OnBoarding API up"
    });
})

// Insert onboarding details 
router.post('/insertOnBoardingDtls', (req, res) => {
    var count = 0;
    try{
        OnBoardingModel.find().then((response)=>{
        
        const newOnBoarding = new OnBoardingModel(
            {
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                phone:req.body.phone,
                address:req.body.address,
                country:req.body.country,
                province:req.body.province,
                sin:req.body.sin,
                accountName:req.body.accountName,
                accountNumber:req.body.accountNumber,
                bankName: req.body.bankName,
                beneficiaryEmail: req.body.beneficiaryEmail,
                bankBranchCode: req.body.bankBranchCode,
                bankPhone: req.body.bankPhone
              }
        )
        
  
        newOnBoarding.save().then((result)=>{
          return res.status(200).json(
            {
              success: true,
              message:"OnBoarding completed Successfully"
            })
        }).catch((error)=>{
          return res.status(500).json(
            {
              success: false,
              message:"Internal Server Error occurred while processing onboarding details",
              error:error.message
            })
        })
        
      })
      }
      catch(error){
        return res.status(500).json(
          {
            success: false,
            message:"Internal Server Error occurred while processing onboarding details",
          })
      }
  }); 

module.exports = router;