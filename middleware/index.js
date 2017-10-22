var Poll = require("../models/poll");

module.exports = {
  isLoggedIn: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    
    return res.json({ err: 'You have to log in to continue!'});
  },
  isVoted: function(req, res, next) {
    if (req.isAuthenticated()) {
      Poll.findById(req.params.id, function(err, poll) {
        if (err) console.log(err);
        else if (poll.voters.indexOf(req.user._id) != -1) {
          console.log("Voted");
          res.json({ err: 'you have already voted for this poll!'});
        } else {
          next();
        }
      });
    } else {
      return res.json({ err: 'You have to log in to continue!'});
    }
  },
  checkUserPoll: function(req, res, next){
    if(req.isAuthenticated()){
        Poll.findById(req.params.id, function(err, poll){
           if (err) console.log(err);
           if(poll.author.equals(req.user._id)){
               next();
           } else {
               res.json({err: "You don't have permission to do that!"});           }
        });
    } else {
        res.json({err: "You have to log in to continue!"});
    }
  }
}