var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mitubo');

global.db = {
	mongoose: mongoose,
	User: require('./user')(mongoose),
};

module.exports = global.db;