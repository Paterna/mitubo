var express = require('express');
var router = express.Router();

var usersCtrl = require('../controllers/users');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { user: null});
});

router.get('/registro', usersCtrl.new);
router.post('/users', usersCtrl.create);

module.exports = router;
