var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(req, res) {

	var video = new Schema({
		name: String,
		extension: String
	});

	var Video = mongoose.model('Video', video);

	return Video;
}