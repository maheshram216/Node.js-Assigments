const express = require("express");
const mongooes = require("mongoose");
const offerRoute = require("./routes/offer")
const Player = require("./modal/player");
const playerRoute = require("./routes/playerlogin");
var jwt = require('jsonwebtoken');
const secret = "RESTAPI"
mongooes.connect("mongodb://localhost/offer");
const app = express();


app.use('/Offers', offerRoute);
app.use('/', playerRoute);


app.listen(3001, () => console.log("server started..."));

