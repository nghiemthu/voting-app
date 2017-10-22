var express = require("express");
var router = express.Router();

var passportTwitter = require("../auth/twitter");

router.get('/login', function(req, res){
    res.redirect('/');
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
  
router.get('/api/user', function(req, res){
  res.json(req.user || null);
});

module.exports = router;