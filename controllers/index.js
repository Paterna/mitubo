var models = require('../models');

exports.init = function(req, res, next) {
	res.locals.user = {};
	next();
}