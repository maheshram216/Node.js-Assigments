const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name : {type: String, required: true},
    rollNum: {type: Number, unique: true},
    branch: {type: String, required: true}, 
    section: String
}, {timestamps: true});


const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
