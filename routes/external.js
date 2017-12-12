//packages
const express = require('express');
const router  = express.Router();
var request = require('request');

router.post('/goo', (req,res,next) => {
	const options = {  
    	url: 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDPcnaEQXmgJL8ZkP2mTnQpYRyzzab5wuA',
    	method: 'POST',
    	headers: {
        	'Accept': 'application/json'
    	},
    	body: `{"requests":  [{ "features":  [ {"type": "TEXT_DETECTION"}], "image": {"source": { "imageUri": "${req.body.name}"}}}]}`,
	};

	request(options, function (error, response, body) {
		let json = JSON.parse(body);
		res.send(json.responses.text);
    });

});

module.exports = router; //make router exportable