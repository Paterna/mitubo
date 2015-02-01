var userCtrl = require('./users');

exports.loginRequired = function (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login?redir=' + req.url);
    }
};

exports.new = function(req, res) {
    res.render('login', { redir: req.query.redir || '/' });
};

exports.create = function(req, res) {

    var redir = (req.body.redir || '/');

    var email     = req.body.email;
    var password  = req.body.pwd;

    userCtrl.login(email, password, function(error, user) {

        if (error) {
            res.redirect("/login?redir=" + redir);        
            return;
        }

        req.session.user = {
        	id: user._id,
        	name: user.name,
        	email: user.email,
        	password: user.password
        };
        res.redirect(redir);
    });
}; 

exports.destroy = function(req, res) {

    delete req.session.user;
    res.redirect("/login");     
};