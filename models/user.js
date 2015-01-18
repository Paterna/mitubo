var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(req, res) {

	var user = new Schema({
		name: String,
		email: String
	});

	var User = mongoose.model('User', user);

	return User;
}