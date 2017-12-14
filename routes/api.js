//packages
const express = require('express');
const router  = express.Router(); //router handler 
const Ninja   = require('../models/ninjas.js')

//get list of ninjas
router.get('/ninjas', (req,res,next) => {
	/*
	Ninja.find({}).then(ninja){
		res.send(ninja);
	}*/
	Ninja.geoNear(
		{type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
		{maxDistance: 100000, spherical: true}
	).then((ninja) => {
			res.send(ninja);
	})
});

//add new ninja
router.post('/ninjas', (req,res,next) => {
	Ninja.create(req.body).then(function(ninja){ //.then says create entry in mongo THEN send response
		res.send({ninja});
	}).catch(next); //creates new instance of ninja (model) & saves to db & sends confirmation
});

//update existing ninja
router.put('/ninjas/:id', (req,res,next) => {
	Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(() => { //use the Ninja object with the findByIdAndUpdate method by the id and update with the body
		Ninja.findOne({_id: req.params.id}).then((ninja) => { //if we return ninja from findByIdAndUpdate we get old value, use findOne to retrieve new record
			res.send(ninja);
		});
	});
});

//delete ninja from the database
router.delete('/ninjas/:id', (req,res,next) => {
	Ninja.findByIdAndRemove({_id: req.params.id}).then((ninja) => { //use the Ninja object with the findByIdAndRemove mongoose method to remove the record
		res.send(ninja);
	});
});

module.exports = router; //make router exportable