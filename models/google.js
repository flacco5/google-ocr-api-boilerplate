//packages
const mongoose = require('mongoose');
const Schema   = mongoose.Schema; //create schema object from mongoose

//google schema 
const GoogleSchema = new Schema({
	link: {
		type: String, 
		required: true
	}, 
	description: {
		type: String
	}
})

//create ninja model: use the model method, define the collection then import schema
const Google = mongoose.model('google', GoogleSchema);

//export model and schema
module.exports = Google;