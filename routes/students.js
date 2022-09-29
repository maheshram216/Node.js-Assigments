const express = require("express");
const Student = require("../models/students");
const bodyparser = require("body-parser");
const router = express.Router();

router.use(bodyparser());
// GET-- fetch/read the data from database
router.get("/", async (req, res) => {
    // write code to read the data and send as response
    try{
        const students = await Student.find();
        res.status(200).json({
            status: "success",
            students 
        })
    }catch(e) {
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
});

// GET-- fetch/read the data from database
router.get("/:id", async (req, res) => {
    // write code to read the data and send as response
    try{
        const students = await Student.find({_id: req.params.id});
        res.status(200).json({
            status: "success",
            students 
        })
    }catch(e) {
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
});
// POST-- create data in database
router.post("/", async (req, res) => {
    // write code to read the data and send as response
    try{
        console.log(req.body);
        const students = await Student.create(req.body);
        res.status(200).json({
            status: "success",
            students 
        })
    }catch(e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
});

// PUT-- Update data in database
router.put("/:id", async (req, res) => {
    // write code to read the data and send as response
    try{
        console.log(req.body);
        const students = await Student.updateOne({_id: req.params.id}, req.body);
        res.status(200).json({
            status: "success",
            students 
        })
    }catch(e) {
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
})

// DELETE-- Update data in database
router.delete("/:id", async (req, res) => {
    // write code to read the data and send as response
    try{
        console.log(req.body);
        const students = await Student.deleteOne({_id: req.params.id});
        res.status(200).json({
            status: "success",
            students 
        })
    }catch(e) {
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
})

module.exports= router;