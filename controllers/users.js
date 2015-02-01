var models = require('../models');

exports.new = function(req, res) {
    res.render('registrar');
}

exports.newLogin = function(req, res) {
    res.render('login');
}

exports.create = function(req, res, next) {

    res.locals.user;
    var user_name = req.body.name;
    var user_email = req.body.email;
    var pwd1 = req.body.pwd1;
    var pwd2 = req.body.pwd2;

    var validName = false;
    var validEmail = false;
    var validPass = false;

    var validateData = function() {
        validName = (typeof user_name == 'string' || user_name instanceof String) && user_name.length > 0;
        validEmail = /^[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}$/.test(user_email);
        validPass = (pwd1.length > 4) && (pwd1 == pwd2);

        return validName && validEmail && validPass;
    }

    if (validateData()) {
        var user = new models.User({
            name: user_name,
            email: user_email,
            password: pwd1
        });

        user.save(function(err, user) {
            if (err)
                return res.send(err);
            else {
                console.log('Nuevo usuario: ' + user);
                res.locals.user = user;
                next();
            }
        });
    }
    else {
        res.send();
    }
}

exports.login = function(email, password, callback) {
    
    models.User.find({ email: email },
        function(err, user) {
            if (err) {
                console.log('Error al buscar al usuario: %s', email);
                next(err);
            }
            else {
                if (user[0]) {
                    if (user[0].password == password) {
                        callback(null,user[0]);
                        return;
                    }
                }
                else {
                    callback(new Error('Password erróneo.'));
                    return;
                }
            }
        });
}; 