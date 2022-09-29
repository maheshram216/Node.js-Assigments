const express = require("express");
const bodyparser = require("body-parser");
const Player = require('../modal/player');
const Offer = require("../modal/model");
var jwt = require('jsonwebtoken');
const router = express.Router();
const secret = 'RESTAPI'

router.use(bodyparser());

router.get('/', async (req, res) => {
    try {
        const token = req.headers.authorization?.split("Test ")[1];
        if (token) {
            // verify token
            jwt.verify(token, secret, async function (err, decoded) {
                // err
                if (err) {
                    return res.json({
                        
                        status: "failure",
                        meassage: e.meassage
                    })
                }
                const player = decoded.data;
                const { page = 1, records = 10, attribute = "offer_title", query = "Diwali" } = req.query;
                const offerdata = await Offer.findOne();
                console.log(offerdata.target);
                res.send('ok')

            });
        } else {
            return res.json({
                status: "failure",
                meassage: 'invalid'
            })
        }
    }catch(e){
        return res.json({
            status: "failure",
            meassage: 'error'
        })
    }
   
});

router.post('/', async (req, res) => {
    try {
        const offerData = await Offer.create(req.body);
        res.json({
            status: "Success",
            offerData
        })
    } catch (e) {
        res.json({
            status: "failed",
            message: e.message
        })
    }
})
module.exports = router;