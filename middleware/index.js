var Poll = require("../models/poll");

module.exports = {
  isLoggedIn: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    
    return res.json({ err: 'You have to log in!'});
  },
  isVoted: function(req, res, next) {
    if (req.isAuthenticated()) {
      Poll.findById(req.params.id, function(err, poll) {
        if (err) console.log(err);
        else if (poll.voters.indexOf(req.user._id) != -1) {
          console.log("Voted");
          res.json({ err: 'Already Voted!'});
        } else {
          next();
        }
      });
    } else {
      return res.json({ err: 'You have to log in!'});
    }
  }
}