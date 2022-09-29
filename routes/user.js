const express = require("express");
const User = require("../models/users");
const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const secret = "RESTAPI";

router.use(bodyparser());

router.post("/register", body('email').isEmail(), body('name').isAlpha()
,body("password").isLength({
    min: 6,
    max: 16
}), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {name, email, password } = req.body;
        console.log(email);
        const user = await User.findOne({email});
        if(user){
            return res.status(403).json({ 
                status: "failed",
                message: "User already exists "
            });
        }

        bcrypt.hash(password, 10, async function(err, hash) {
            if(err) {
                return res.status(400).json({ status: "Not Ok", message: err.message });
            }
            const user = await User.create({
                name,
                email,
                password: hash
            });
            res.json({
                status: "success",
                user
            })
        });

    } catch (e) {
        res.status(400).json({
            status: "Failed to register",
            message: e.message
            }
        )
    }

});


router.post("/login", body('email').isEmail(), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {email, password } = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(403).json({ 
                status: "failed",
                message: "Invalid email/ Invalid user"
            });
        }
        // Load hash from your password DB.
        bcrypt.compare(password, user.password, function(err, result) {
            if(err) {
                return res.status(403).json({ status: "Failed", message: err.message});
            }
            if(result){
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: user._id
                  }, secret);

                res.status(200).json({
                    status: "Sucess",
                    message: "Login successful",
                    token
                })
            }else{
                res.status(403).json({
                    status: "Sucess",
                    message: "Invalid credentials"
                })
            }
        });

    } catch (e) {
        res.status(400).json({
            status: "Failed to register",
            message: e.message
            }
        )
    }

});
module.exports = router;
