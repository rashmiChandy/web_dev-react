// @Author: Rashmi Chandy 
// Feature: Job Posting Management

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobPostingSchema = new Schema({
    course:{
        type: String,
        required:true
    },
    position:{
        type: String,
        required:true
    },
    hourlyRate:{
        type: String,
        required:true
    },
    duties:{
        type: String,
        required:true
    },
    totalHours:{
        type:String,
        required:true
    }
   
},{timestamps:true})

const JobPostingModel = mongoose.model('job_postings', jobPostingSchema)

module.exports = JobPostingModel