var express     = require("express");
var router      = express.Router();
var mongoose    = require('mongoose');
var Poll        = require("../models/poll");
var Option      = require("../models/option");
var middleware  = require("../middleware");

// Render all polls avaiable
router.get('/api/polls', function(req, res){
  Poll.find({}).populate("author").populate("options")
    .exec(function(err, polls){
    if (err)
      console.log(err);
    else {
      res.json(polls); 
    }
  });
});

// Render all polls avaiable
router.get('/api/polls/page/:number', function(req, res){
  Poll.find({}).skip(req.params.number * 5).limit(5).populate("author").populate("options")
    .exec(function(err, polls){
    if (err)
      console.log(err);
    else {
      res.json(polls); 
    }
  });
});

// Render create page
// router.get('/new', middleware.isLoggedIn, function(req, res){
//   res.render('new');
// });

// Get my polls
router.get('/api/mypolls', middleware.isLoggedIn, function(req, res){
  Poll.find({'author': req.user._id})
    .populate("author").populate("options")
    .exec(function(err, poll){
      if (err) console.log(err);
      else {
        res.json(poll);
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
      if (!req.body.title) {res.json({err: "Title is empty"}); return}
      if (options.length <= 1) {res.json({err: "Need more than 1 option"}); return}
      
      poll.title        = req.body.title;
      poll.description  = req.body.description;
      poll.author       = req.user._id;
      poll.date         = Date.now();
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
            if (poll.options.length == options.length) {
                poll.save();
                poll.populate("author").populate("options", function(err, poll) {
                  if (err) console.log(err);;
                  res.json(poll);
                });
            }
          }
        });
      });
    };
  });
});

// Render item page
router.get('/api/polls/:id', function(req, res){
  Poll.findById(req.params.id).populate("options").exec(function(err, poll){
    if(err) console.log(err);
    else {
        res.json(poll);
    }
  });
});


router.delete("/polls/:id", middleware.checkUserPoll, function(req, res){
    Poll.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
          //res.redirect('/');
          res.json({success: "You have deleted your poll successfully!"});
        }
    });
});

module.exports = router;