var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var models = require('../models');

exports.new = function(req, res) {
	res.render('registrar', {error: false});
}

exports.create = function(req, res) {

	var user_name = req.body.name;
	var user_email = req.body.email;
	var pwd1 = req.body.pwd1;
	var pwd2 = req.body.pwd2;

	var validateData = function(data) {
		switch(data) {
			case 'name':
				return (typeof user_name == 'string' || user_name instanceof String) && user_name.length > 0;
			case 'email':
				return /^[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}$/.test(user_email);
			case 'password':
				return (pwd1.length > 0) && (pwd1 == pwd2);
			default:
				return true;
		}
	}

	// TODO: Tratar validación

	var user = new models.User({
		name: user_name,
		email: user_email
	});

	user.save(function(err, user) {
		if (err)
			res.json(err);
		else
			console.log('Nuevo usuario: ' + user);
		res.redirect('/');
	});
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