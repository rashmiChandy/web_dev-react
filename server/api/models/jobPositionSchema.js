// @Author: Rashmi Chandy 
// Feature: Job Position Management

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobPostionSchema = new Schema({
    hourlyRate:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    position:{
        type:String,
        required:true
    }
   
},{timestamps:true})

const JobPostionModel = mongoose.model('positions', jobPostionSchema)

module.exports = JobPostionModel