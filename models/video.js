var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(req, res) {

	var video = new Schema({
		name: String,
		location: String,
		type: String,
		duration: Number,

	});

	var Video = mongoose.model('Video', video);

	return Video;
}