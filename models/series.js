require('dotenv').config()

const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');

connection = mongoose.createConnection(process.env.DATABASE_URL);
autoIncrement.initialize(connection);

const seriesSchema = new mongoose.Schema({
	id : {
		type : Number,
		required : false
	},
	name : {
		type : String,
		required : true
	},
	status : {
		type : String,
		required : true
	},
	season : {
		type : String,
		required : true
	},
	updated_at : {
		type : Date,
		required : false,
		default : Date.now()
	}
}) 

seriesSchema.plugin(autoIncrement.plugin, { model: 'Series', field: 'id' });
module.exports = mongoose.model('Series', seriesSchema)