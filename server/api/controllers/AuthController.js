/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const passport = require('passport');

module.exports = {
    signin: async function(req, res) {
        await passport.authenticate('local', function(err, user, info) {
            if(err || !user) {
                return res.send({
                    message: info.message,
                    user
                });
            }
  
            req.login(user, function(err) {
                if(err) {
                    res.send(err);
                }
                sails.log('User '+user.id+' has logged in.');
                return res.send(user);
            });
        })(req, res);
    },
  
    //Logout function
    signout: async function(req, res) {
        req.logout();
        res.send('logout');
    },

    //Register function
    signup: async function(req, res) {

        const data = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        };

        User.create(data).fetch().exec(function(err, user) {
            if(err) {
                return res.send(err);
            }

            //TODO: Maybe send confirmation email to the user before login
            req.login(user, function(err){
                if(err) {
                    return res.send(err);
                }
                sails.log('User '+ user.id +' has logged in.');
                return res.send(user);
            });
        });
    }
};
