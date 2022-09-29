const express = require("express");
const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const Post = require("../models/posts");
const { body, validationResult } = require('express-validator');
const router = express.Router();

router.use(bodyparser());

router.get("/", async (req, res) => {
    try{
        // code to fetch the posts
        console.log(req.user);
        const {pagesize = 1} = req.query;
        const posts = await Post.find({user: req.user}).skip((Number(pagesize)-1)* 10).limit(10);
        res.json({
            status: "Success",
            posts
        })

    }catch(e){
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
});

router.post("/", async (req, res) => {
    try{
        // code to fetch the posts
        const posts = await Post.create({
            title: req.body.title,
            description: req.body.description,
            user: req.user
        });
        res.json({
            status: "Success",
            posts
        })

    }catch(e){
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
});

module.exports = router;