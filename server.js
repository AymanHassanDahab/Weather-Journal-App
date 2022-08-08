// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Start up an instance of app
const express = require('express');
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { request } = require('http');
app.use(cors());

// Port
const port = 8000;

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
app.listen(port, listening)

function listening() {
    console.log(`Server runs on: http://localhost:${port}`);
}

// Respond with JS object when a GET request is made to the homepage (to get all the data by:  http://localhost:8000/all)
app.get('/all', function(req, res){
    res.send(projectData).status(200);
});

// To post data by: http://localhost:8000/postData
app.post('/postData', function(req, res) {
    projectData = {
        date: request.body.date,
        temp: request.body.temp,
        content: request.body.content
    }
    res.send(projectData).status(200);
});