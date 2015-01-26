var models = require('../models');

exports.new = function(req, res) {
    res.render('registrar');
}

exports.newLogin = function(req, res) {
    res.render('login');
}

exports.create = function(req, res, next) {

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
                res.json({ code: 1, msg: err});
            else {
                console.log('Nuevo usuario: ' + user);
                res.locals.user = {
                    name: user.name,
                    email: user.email,
                    password: user.password
                };
                next();
            }
        });
    }
    else {

        res.json({ code: 2, msg: 'Campos no válidos.'});
    }
}

exports.getUsers = function(req, res, next) {
    var users = [];
    models.User.find({},
        function (err, users) {
        users.push();
    });
    next();
}

// exports.login = function (req, res, next) {

//     var user_email = req.body.email;
//     var user_pwd = req.body.pwd;

//     res.locals.user = {};

//     models.User.find({email: user_email, password: user_pwd},
//         function (err, user) {
//             if (err)
//                 console.log('Error: %s', err);
//             else {
//                 res.locals.user = user[0];
//                 console.log('User: %s', user);
//                 console.log('Locals 2: %s', JSON.stringify(res.locals.user));    
//                 next();
//             }
//         });
// }