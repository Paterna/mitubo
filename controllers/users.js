var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var models = require('../models');

exports.new = function(req, res) {
	res.render('registrar');
}

exports.create = function(req, res) {

	var user = new models.User({
		name: req.body.name,
		email: req.body.email
	});

	console.log('Usuario: ' + user);

	user.save(function(err, user) {
		if (err)
			res.json(err);
		res.redirect('/');
	})
}

// exports.getUsers = function(req, res) {
// 	// models.User.find()
// 	// .success(function(users) {
// 	// 	res.render('index', {
//  //            users: users
//  //        });
// 	// })
// 	// .error(function(err) {
// 	// 	console.log('Error: ' + err);
// 	// });
// }