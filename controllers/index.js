var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var models = require('../models');

passport.use(new LocalStrategy({
		usernameField: 'email',
    	passwordField: 'pwd'
	},
	function(email, password, done) {
		models.User.find({ email: email },
			function(err, user) {
				return done(null, user);
			});
	}
));

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

exports.index = function(req, res, next) {
	res.locals.user = req.user || {};
	console.log('Req.user: %s', req.user);
	next();
}