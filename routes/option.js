var express = require("express");
var router = express.Router();
var Poll = require("../models/poll");
var Option = require("../models/option");

// Render all polls avaiable
router.get('/polls', function(req, res){
Poll.find({}, function(err, polls){
    if (err)
      console.log(err);
    else {
      res.render('polls', {polls: polls}); 
    };
  });
});

// Render create page
router.get('/new', function(req, res){
  res.render('new');
});

// Create new poll
router.post('/polls', function(req, res){

  var options = req.body.options.split(', ');

  Poll.create({}, function(err, poll){
    if (err) console.log(err);
    else {
      poll.title = req.body.title;
      poll.description = req.body.description;
      
      options.map(function(opt, index){
        Option.create({}, function(err, option){
          if (err) console.log(err);
          else {
            option.description = opt;
            option.save();
            poll.options.push(option);
            
            if (index == options.length-1) {
                poll.save();
                res.redirect('/polls');
            };
          };
        });
      });
    };
  });
});

// Render item page
router.get('/polls/:id', function(req, res){
  Poll.findById(req.params.id).populate("options").exec(function(err, poll){
    if(err) console.log(err);
    else {
        res.render('show', {poll: poll});
    };
  });
});

module.exports = router;