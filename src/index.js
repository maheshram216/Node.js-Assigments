const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const { json } = require('express');
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here

app.get('/', (req, res) => {
    res.send('Hello world..!');
});

app.post('/add', (req, res) => {
    let num1 = req.body.num1;
    let num2 = req.body.num2;

    if (num1 == "" || num2 == "") {
        res.status(400).json({
            status: "error",
            message: "Please provide input"
        })
    };

    if (isNaN(num1) || isNaN(num2)) {
        res.status(400).json({
            status: "failure",
            message: "invalid datatype"
        })
    };

    let sum = Number(num1) + Number(num2);

    if (Number(num1) < -1000000 || Number(num2) < -1000000 || sum < -1000000) {
        res.status(400).json({
            message: "Underflow",
        })
    }

    if (Number(num1) > 1000000 || Number(num2) > 1000000 || sum > 1000000) {
        res.status(400).json({
            message: "Overflow",
        })
    }

    res.status(200).json({
        status: "sucess",
        message: 'the sum of given two numbers',
        sum: sum
    });
})

app.post('/sub', (req, res) => {
    let num1 = req.body.num1;
    let num2 = req.body.num2;


    if (num1 == "" || num2 == "") {
        res.status(400).json({
            status: "error",
            message: "Please provide input"
        })
    };

    if (isNaN(num1) || isNaN(num2)) {
        res.status(400).json({
            status: "failure",
            message: "invalid datatype"
        })
    };

    let sub = Number(num1) - Number(num2);

    if (Number(num1) < -1000000 || Number(num2) < -1000000 || sub > -1000000) {
        res.status(400).json({
            message: "Underflow",
        })
    }

    if (Number(num1) > 1000000 || Number(num2) > 1000000 || sub > 1000000) {
        res.status(400).json({
            message: "Overflow",
        })
    }

    res.status(200).json({
        status: "sucess",
        message: 'the difference of given two numbers',
        difference: sub
    });


});

app.post('/multiply', (req, res) => {
    let num1 = req.body.num1;
    let num2 = req.body.num2;

    if (num1 == "" || num2 == "") {
        res.status(400).json({
            status: "error",
            message: "Please provide input"
        })
    };

    if (isNaN(num1) || isNaN(num2)) {
        res.status(400).json({
            status: "failure",
            message: "invalid datatype"
        })
    };

    let mul = Number(num1) * Number(num2);

    if (Number(num1) < -1000000 || Number(num2) < -1000000 || mul < -1000000) {
        res.status(400).json({
            message: "Underflow",
        })
    }

    if (Number(num1) > 1000000 || Number(num2) > 1000000 || mul > 1000000) {
        res.status(400).json({
            message: "Overflow",
        });
    };

    res.status(200).json({
        status: "sucess",
        message: 'The product of given numbers',
        result: mul
    });


});

app.post('/divide', (req, res) => {
    let num1 = req.body.num1;
    let num2 = req.body.num2;

    if (num1 == "" || num2 == "") {
        res.status(400).json({
            status: "error",
            message: "Please provide input"
        })
    };

    if (isNaN(num1) || isNaN(num2)) {
        res.status(400).json({
            status: "failure",
            message: "invalid datatype"
        })
    };

    if (Number(num2) === 0) {
        return res.status(400).json({
            message: "Cannot divide by zero"
        })
    }

    let div = Number(num1) / Number(num2);

    if (Number(num1) < -1000000 || Number(num2) < -1000000 || div < -1000000) {
        res.status(400).json({
            message: "Underflow",
        })
    }

    if (Number(num1) > 1000000 || Number(num2) > 1000000 || div > 1000000) {
        res.status(400).json({
            message: "Overflow",
        })
    }

    res.status(200).json({
        status: "sucess",
        message: 'The division of given numbers',
        result: div
    });


});


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;