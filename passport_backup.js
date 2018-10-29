var localStrategy = require('passport-local').Strategy;
var bcrypt = require("bcryptjs");
var userModel = require("./models/usermodel");

var mongoose = require("mongoose");
mongoose.connect("mongodb://inspiration:inspiration999@ds121593.mlab.com:21593/inspiration");

module.exports = (passport) => {
    passport.use(new localStrategy( (username, password, done) => {
        userModel.findOne({username: username}, (err, user) => {
            if (err) {
                return done(err);
            };
            if(!user){
                return done(null, false, {message: "Incorrect username"});
            };
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: "Incorrect pwd"});
                }
            });
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
      
    passport.deserializeUser(function(id, done) {
        userModel.findById(id, function(err, user) {
            done(err, user);
        });
    });

};