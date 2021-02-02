const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    User.findOne(id)
        .done(function(error, user) {
            cb(error, user);
        });
});

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function(email, password, cb) {
        User.findOne({email: email}, function(err, user) {
            if(err) {
                return cb(err);
            } else if(!user) {
                return cb(null, false, {message: 'Username not found'});
            }

            bcrypt.compare(password, user.password, function(err, res) {
                if(!res) {
                    return cb(null, false, { message: 'Invalid Password' });
                }
                let userDetails = {
                    email: user.email,
                    username: user.username,
                    id: user.id,
                    role: user.role
                };
                return cb(null, userDetails, { message: 'Login Succesful'});
            });
        });
    }
));
