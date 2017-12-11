//packages
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
var winston = require('winston'), expressWinston = require('express-winston');

//set up express app
const app = express(); 

//connect to mongo
mongoose.connect('mongodb://192.168.1.26/ninjago', { useMongoClient: true});
mongoose.Promise = global.Promise; 


//parse incoming json, needs to be before routes so it can parse message
app.use(bodyParser.json());

//winston logs incoming request
app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true,
        level: 'silly'
      })
    ]
}));

//import router, initialize routes, add api to router
app.use('/api', require('./routes/api.js')); 

//winston logging errors 
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
          json: true,
          colorize: true
        })
    ]
}));

//error handling middleware put after routes TO process bad requests 
app.use(function(err, req, res, next) {
		res.status(422).send({Error: err.message});
})

//listen for requests
app.listen(process.env.port || 4000, function() {
	console.log('Awaiting your command on port 4000')
});