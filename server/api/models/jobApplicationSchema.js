// @Author: Rashmi Chandy 
// Feature: Application Management

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobApplicationSchema = new Schema({
    applicationId:{
        type: String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    lastName:{
        type: String,
        required:false
    },
    firstName:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    course:{
        type: String,
        required:true
    },
    jobPosition:{
        type: String,
        required:true
    },
    degree:{
        type: String,
        required:true
    },
    program:{
        type: String,
        required:true
    },
    startYear:{
        type: String,
        required:true
    },
    endYear:{
        type: String,
        required:true
    },
    inputFields:{
        type: Array,
        required:false
    },
    skills:{
        type: Array,
        required:false
    }
   
},{timestamps:true})

const JobApplicationModel = mongoose.model('job_application', jobApplicationSchema)

module.exports = JobApplicationModel