const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collaboratorSchema = new Schema({
    userId:{
        type: String,
        required:true
    },
    courseId:{
        type: String,
        required:false
    }
},{timestamps:true});

const CollaboratorModel = mongoose.model('collaborator', collaboratorSchema);

module.exports = CollaboratorModel;