//packages
const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose'); 
const morgan     = require('morgan');
const fs         = require('fs'); 
//set up express app
const app = express(); 

//connect to mongo
mongoose.connect('mongodb://192.168.1.26/ninjago', { useMongoClient: true});
mongoose.Promise = global.Promise; 


//parse incoming json, needs to be before routes so it can parse message
app.use(bodyParser.json());

//create directory for log files
var accessLogStream = fs.createWriteStream(__dirname + '/logs/general.log',{flags: 'a'});

//write requests to log files & log to console
app.use(morgan('combined', {stream: accessLogStream}))
app.use(morgan('dev'))

//import router, initialize routes, add api to router
app.use('/api', require('./routes/api.js')); 
app.use('/google', require('./routes/ocr.js')); 

//error handling middleware put after routes TO process bad requests 
app.use(function(err, req, res, next) {
		res.status(422).send({Error: err.message});
})

//listen for requests
app.listen(process.env.port || 4000, function() {
	console.log('Awaiting your command on port 4000')
});