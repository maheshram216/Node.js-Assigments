const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here
app.get('/mario',async (req, res)=>{
    const data = await marioModel.find();
    res.json({
        status:"success",
        data
    });
});

app.get('/mario/:id',async (req, res)=>{
    try{
        const result = await marioModel.findOne({_id:req.params.id})
    res.json({
        status:"success",
        result
    });
    }catch(e){
        res.status(400).json({
            status:"failure",
            message: e.meassage
        });
    } 
    
});

app.post('/mario' ,async (req, res)=>{
    try {
        const data = await marioModel.create(req.body);
        res.status(201).json({
            status:"success",
            data
        });
    } catch (e) {   
        res.status(400).json({
            status :"failed",
            meassage: e.meassage
        });
        
    }
});

app.put('/mario/:id',async (req,res)=>{
    try {
        const data =await marioModel.updateOne({_id:req.params.id},req.body);
        res.json({
            status:"success",
            result: data
        });
    } catch (e) {
        res.status(400).json({
            status: "faliure",
            meassage: e.meassage
        });
    }
});

app.delete('/mario/:id',async (req,res)=>{
    try {
        const data =await marioModel.deleteOne({_id:req.params.id});
        res.status(200).json({
            status:"success",
            result: data
        });
    } catch (e) {
        res.status(400).json({
            status: "faliure",
            meassage: e.meassage
        });
    }
});

module.exports = app;