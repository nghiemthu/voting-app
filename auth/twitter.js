var passport = require('passport');
var TwitterStrategy = require ('passport-twitter');

var User = require('../models/user');
var config = require('../_config');
var init = require('../auth/init');

passport.use(new TwitterStrategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: 'https://voting-app-thu.herokuapp.com/auth/twitter/callback'
  },
  function(token, tokenSecret, profile, done) {
    
    var searchQuery = {
      username: profile.displayName
    };
    
    var updates = {
      username: profile.displayName,
      id: profile.id
    };
    
    var options = {
      upsert: true
    };
    
    User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
        return done(err);
      } else {
        return done(null, user);
      }
    });
  })
);

init();

module.exports = passport;