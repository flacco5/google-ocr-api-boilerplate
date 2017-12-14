//packages
const mongoose = require('mongoose');
const Schema   = mongoose.Schema; //create schema object from mongoose

//geolocation schema
const GeoSchema = new Schema({
	type: {
		default:"Point", 
		type: String
	},
	coordinates: {
		type: [Number], //use bracket for arrays
		index: "2dsphere"
	}
});

//create object of schema from mongoose
const NinjaSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name field is required']
	},
	rank: {
		type: String
	},
	available: {
		type: Boolean, 
		default: false
	},
	geometry: GeoSchema //nests the above geo schema model into the ninja schema
});

//create ninja model: use the model method, define the collection then import schema
const Ninja = mongoose.model('ninja', NinjaSchema);

//export model and schema
module.exports = Ninja;