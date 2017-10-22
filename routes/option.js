var express     = require("express");
var router      = express.Router();
var mongoose    = require('mongoose');
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
            res.json(option);
        }
      })
    }
  })
});

// vote for option with optionid
router.post('/polls/:id/:optionid', middleware.isVoted, function(req, res){
  Option.findOneAndUpdate(
    {_id: req.params.optionid}, 
    {description: req.body.description}, //new option
    { upsert: true}, 
    function(err, option){
    if(err) console.log (err);
    else {
      Poll.findById(req.params.id, function(err, poll) {
        if (err) console.log(err);
        else {
          if (req.user) poll.voters.push(req.user._id);
          option.vote = option.vote+1;
          option.save();
          poll.save();
          res.json(option);
        }
      });
    }
  });
});


// vote for option with optionid
router.post('/api/polls/:id', middleware.isVoted, function(req, res){
  
  const optionId = (req.body.id == 'newValue' || !req.body.id) ? new mongoose.mongo.ObjectID() : req.body.id;
  Option.findOneAndUpdate(
    {_id: optionId}, //find with description
    {description: req.body.description}, //new option
    { upsert: true, 'new': true }, 
    function(err, option){
    if(err) console.log (err);
    else {
      Poll.findOne({_id: req.params.id}, function(err, poll) {
        if (err) console.log(err);
        else {
          if (req.user) poll.voters.push(req.user._id);
          option.vote = option.vote+1;
          option.save();

          if(poll.options.indexOf(option._id) <= -1){
            poll.options.push(option._id);
          }
          poll.save();
          res.json(poll);
        }
      });
    }
  });
});

module.exports = router;