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
    res.redirect('/');
  });
  
// logout route
router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/");
});
  
router.get('/user', function(req, res){
  console.log(req.user);
  res.json(req.user || null);
});

module.exports = router;