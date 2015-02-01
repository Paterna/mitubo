var express = require('express');
var router = express.Router();

var sessionCtrl = require('../controllers/session');
var usersCtrl = require('../controllers/users');
var videoCtrl = require('../controllers/video');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
});

router.get('/login', sessionCtrl.new);
router.post('/login', sessionCtrl.create);
router.get('/logout', sessionCtrl.destroy);

router.get('/registro', usersCtrl.new);
router.post('/registro', usersCtrl.create, function(req, res) {
    res.render('index');
});


router.get('/upload', videoCtrl.view);
router.post('/upload', videoCtrl.upload, function(req, res) {
	res.render('success-upload');
});

router.get('/list', videoCtrl.list, function(req, res) {
	res.render('list');
});
router.get('/video/:id', videoCtrl.play, function(req, res) {
	res.render('play');
});

module.exports = router;
