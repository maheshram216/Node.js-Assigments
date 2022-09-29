const mongoose = require('mongoose');

//  Your code goes here
const marioSchema = new mongoose.Schema({
    name: String,
    weight : Number
})

const marioModel = mongoose.model("mario", marioSchema);

module.exports = marioModel;