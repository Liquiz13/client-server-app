const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user.id);
})

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email'
}, function (email, password, done) {
    User.findOne({ email }, function (err, user) {
        if (err) {
            return done(err)
        }
        if (!user) {
            return done({ message: 'invalid email or password' });
        }
        // if (!user.comparePassword(password)) {
        //     return done({ message: 'invalid email or password' });
        // }
        return done(null, user);
    })
}))
