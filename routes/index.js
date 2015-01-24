var express = require('express');
var router = express.Router();

var usersCtrl = require('../controllers/users');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index');
});

router.get('/registro', usersCtrl.new);
router.post('/registro', usersCtrl.create, function(req, res) {
	res.redirect('/destacados');
});

router.get('/login', usersCtrl.newLogin);
router.post('/login', usersCtrl.login, function(req, res) {
	res.redirect('/destacados');
});

router.get('/destacados', function(req, res) {
	res.render('videos');
})

module.exports = router;
