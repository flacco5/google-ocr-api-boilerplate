//packages
const express = require('express');
const router  = express.Router();
const request = require('request');
const Google  = require('../models/google.js')

//create ocr record and save
router.post('/ocr', (req,res,next) => {
	const options = {  
    	url: `https://vision.googleapis.com/v1/images:annotate?key=${req.body.key}`,
    	method: 'POST',
    	headers: {
        	'Accept': 'application/json'
    	},
    	body: `{"requests":  [{ "features":  [ {"type": "TEXT_DETECTION"}], "image": {"source": { "imageUri": "${req.body.name}"}}}]}`,
	};

        request(options, function (error, response, body) {
            let json = JSON.parse(body);
            if (req.body.description === true) {
                Google.create({
                    link: req.body.name,
                    description: json.responses[0].textAnnotations[0].description
                }).then(function(google){ 
                        res.send({google});
                    }).catch(next);
            } else if (req.body.description === false) {
                res.send(json.responses)
            } else {
                res.status(400).send('Please select description')
            }
        });
});

//retrieve specific ocr records
router.get('/ocr', (req,res,next) => {
    Google.find({
        _id: req.query._id
    }, (err) => {
        if (err) {
            res.send("Didn't work!")
        }
    }).then((google) => {
        res.send(google);
    }).catch(next); 
})

//retrieve all records 

router.get('/ocr/all', (req,res,next) => {
    Google.find({}, (err) =>{
        if (err){
            res.send("Query did not work!")
        }
    }).then((google) => {
        res.send(google);
    }).catch(next); 
})

module.exports = router; //make router exportable