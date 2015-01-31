var express = require('express');
var router = express.Router();
var passport = require('passport');

var usersCtrl = require('../controllers/users');
var videoCtrl = require('../controllers/video');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
});

router.get('/registro', usersCtrl.new);
router.post('/registro', usersCtrl.create, function(req, res) {
    res.redirect('/favourites');
});

router.get('/login', usersCtrl.newLogin);
// router.post('/login', usersCtrl.login, function(req, res) {
//     res.render('play');
// });

router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

router.get('/favourites', function(req, res) {
    res.render('index');
})

router.get('/upload', videoCtrl.view);
router.post('/upload', videoCtrl.upload, function(req, res) {
	res.render('play');
});

router.get('/list', videoCtrl.list, function(req, res) {
	res.render('list');
});
router.get('/video/:id', videoCtrl.play, function(req, res) {
	res.render('play');
});

module.exports = router;
