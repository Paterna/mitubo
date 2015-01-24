exports.index = function(req, res, next) {
	if (!res.locals.user) {
		res.locals.user = {};
		console.log('Locals 1: %s', JSON.stringify(res.locals.user));
	}
	next();
}