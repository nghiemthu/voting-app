var express         = require("express"), 
    app             = express(),
    cookieParser    = require("cookie-parser"),
    mongoose        = require("mongoose"),
    Poll            = require("./models/poll"),
    Option          = require("./models/option"),
    User            = require("./models/user"),
    passport        = require("passport"),
    session         = require("passport-session"),
    Strategy        = require("passport-twitter").Strategy,
    bodyParser      = require("body-parser");
    
// Require Router
var pollRoutes      = require("./routes/poll"),
    authRoutes      = require("./routes/"),
    optionRoutes    = require("./routes/option");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(require('body-parser').json());

mongoose.connect("mongodb://thunghiem01:1234@ds119675.mlab.com:19675/voting-app", { useMongoClient: true });
mongoose.Promise = require('bluebird');

//http://mherman.org/blog/2015/09/26/social-authentication-in-node-dot-js-with-passport/#.WbYoSMgjGUk
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());
  
// Poll.remove({}, function(err) {if (err) console.log(err)});
// Option.remove({}, function(err) {if (err) console.log(err)});

app.use("", pollRoutes);
app.use("", optionRoutes);
app.use("", authRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.redirect('/');
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('server started');
})