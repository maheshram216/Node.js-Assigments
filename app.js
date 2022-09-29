const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/students");
const User =  require("./models/users");
const bodyparser = require("body-parser");
const studentRoutes = require("./routes/students");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/posts");
var jwt = require('jsonwebtoken');
mongoose.connect("mongodb://localhost/restapi");
const secret = "RESTAPI";

const app = express();
app.use(bodyparser());


app.use("/api/v1/posts", (req, res, next) =>{
    if(req.headers.authorization){
        const token = req.headers.authorization.split("random ")[1];

        // invalid token
        jwt.verify(token, secret, function(err, decoded) {
            if(err) {
                return res.status(400).json({ status: "Failed", message : err.message});
            }
            req.user= decoded.data;
            next();
        });   
    }else {
        return res.status(403).json({ status: "Failed", 
        message : "Not authenticated user"});
    }

});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/students", studentRoutes);

app.get("*", (req, res) => {
    // write code to read the data and send as response
    res.status(404).json({
        status: "Failed",
        message: "API NOT FOUND"
    })
})
app.listen(5000, ()=> console.log("The server is up at port 5000"));