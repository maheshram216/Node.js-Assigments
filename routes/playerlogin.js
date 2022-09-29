const express = require("express");
const bodyparser = require("body-parser");
const Player = require('../modal/player');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const routes = express.Router();
const secret = 'RESTAPI'

routes.use(bodyparser());

routes.post('/register', body('player_id').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 6, max: 16 }), async (req, res) => {

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            bcrypt.hash(req.body.password, 10, async function (err, hash) {
                // Store hash in your password DB.
                if (err) {
                    res.status(500).json({ staus: "failed", meassage: err.message });
                } else {
                    const player = await Player.create({
                        player_id: req.body.player_id,
                        password: hash,
                        age: req.body.age,
                        country: req.body.country,
                        installed_days: req.installed_days,
                        coins: req.body.coins,
                        gems: req.body.gems,
                        game_level: req.body.game_level,
                        purchaser: req.body.purchaser
                    });
                    res.status(200).json({
                        status: "success",
                        message: "Registered successfully"
                    })
                }
            });


        } catch (e) {
            res.status(500).json({
                status: "failure",
                message: e.message
            });
        }
    });

routes.post('/login', async (req, res) => {

    try {
        const checkPlayer = await Player.findOne({ player_id: req.body.player_id });
        if (!checkPlayer) {
            res.status(500).json(
                {
                    staus: "login failed",
                    meassage: "Invalid user"
                });
        }
        bcrypt.compare(req.body.password, checkPlayer.password, function (err, result) {
            // result == true
            if(err){
                return res.json({
                    status: 'failed',
                    meassage:err.message,
                });
            }
            if (result) {
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: checkPlayer.player_id
                }, secret);

                res.json({
                    status: "Success",
                    meassage : "Login successful",
                    token
                })
            }else{
                res.json({
                    status: "failed",
                    meassage : "invalid credentials"
                })
            }
        });

    } catch (e) {
        res.status(500).json({
            status: "failure",
            message: e.message
        });
    }
});

module.exports = routes;