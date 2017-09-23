var express     = require("express");
var router      = express.Router();
var Poll        = require("../models/poll");
var Option      = require("../models/option");
var middleware  = require("../middleware");

// Create new option
router.post('/polls/:id/options/new', function(req, res){
  Option.create(req.body.option, function(err, option){
    if (err) console.log(err);
    else {
      Poll.findById(req.params.id, function(err, poll) {
        if(err) console.log(err);
        else {
            poll.options.push(option);
            poll.save();
            res.redirect('/polls/' + req.params.id);
        }
      })
    }
  })
});

// vote for option with optionid
router.post('/polls/:id/:optionid', middleware.isVoted, function(req, res){
  Option.findById(req.params.optionid, function(err, option){
    if(err) console.log (err);
    else {
      Poll.findById(req.params.id, function(err, poll) {
        if (err) console.log(err);
        else {
          if (req.user) poll.voters.push(req.user._id);
          option.vote = option.vote+1;
          option.save();
          poll.save();
          res.redirect('/polls/' + req.params.id);
        }
      });
    }
  })
});

module.exports = router;