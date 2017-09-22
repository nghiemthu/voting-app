var express = require("express");
var router = express.Router();

var passportTwitter = require("../auth/twitter");

router.get('/login', function(req, res){
    res.send('Login Page');
});

router.get('/auth/twitter', passportTwitter.authenticate('twitter'));

router.get('/auth/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });

module.exports = router;