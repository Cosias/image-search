// Requirements
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Model
var historySchema = new Schema({
	searchVal: String,
	searchDate: Date,
	},
	{timestamp: true}
);

var ModelClass = mongoose.model('searchVal', historySchema);

module.exports = ModelClass;