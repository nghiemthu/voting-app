var express     = require("express");
var router      = express.Router();
var Poll        = require("../models/poll");
var Option      = require("../models/option");
var middleware  = require("../middleware");

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
router.get('/new', middleware.isLoggedIn, function(req, res){
  res.render('new');
});

// Get my polls
router.get('/mypolls', middleware.isLoggedIn, function(req, res){
  Poll.find({'author': req.user._id}, function(err, poll){
    if (err) console.log(err);
    else {
      res.send('mypolls: ' + poll);
    }
  }); 
});

// Create new poll
router.post('/polls', middleware.isLoggedIn, function(req, res){

  var options = req.body.options.split(', ');

  Poll.create({}, function(err, poll){
    if (err) console.log(err);
    else {
      
      // Update the poll
      poll.title        = req.body.title;
      poll.description  = req.body.description;
      poll.author       = req.user._id;
      
      // Map through options and add it to moogoose
      options.map(function(opt, index){
        Option.create({}, function(err, option){
          if (err) console.log(err);
          else {
            // Update option and push to the poll
            option.description = opt;
            option.save();
            poll.options.push(option);
            
            // If went through the array
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