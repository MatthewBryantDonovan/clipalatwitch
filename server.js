const express = require('express');
const orm = require('mongoose');
const routes = require("./routes");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const chalk = require('chalk');
const initializePassport = require("./config/passport");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const db = require("./models");
const bodyParser = require("body-parser");
const cookieParser  = require("cookie-parser");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

//passport
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

initializePassport(
  passport,
  username => {
    return (db.User.findOne({username: username})
    .then((user) => 
      {if (user){return user} else {return null}
      }
    ))
  },
  id => {
    return (db.User.findOne({id: id})
    .then((user) => 
      {if (user){return user.id} else {return null}
      }
    ))
  }
);



// add to anything you want to check authenticated
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

// add to anything you want to check not authenticated
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }

  next();
}



// ////// FIXME: test
app.post("/api/users/login", passport.authenticate('local', 
{
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
}
));
///////////////////////////////// FIXME: END TEST


///// SUPER TEST FIXME:////////////////
//    // Endpoint to login
//    app.post('/api/users/login',
//    passport.authenticate('local'),
//    function(req, res) {
//     let resObject = req.user;
//     resObject.password = "";
//     res.send(resObject);
//    }
// );
///// SUPER TEST FIXME:////////////////




app.delete("/logout", (req, res) => {
    console.log(req.session.passport);
    if(req.session.passport.user){
      console.log(true);
    } else {
      console.log(false);
    }
    
    console.log("logout happened");
    
    
    req.logOut();
    res.redirect("/login");
    if(req.session.passport.user){
      console.log(true);
    } else {
      console.log(false);
    }
});
// ////// FIXME: FLASH IS BROKEN

/////////////// FIXME: DELETE FOR production////////////////////
// app.use(express.static("client/build"));
/////////////// FIXME: DELETE FOR production////////////////////



app.use(routes);


orm.connect(process.env.MONGODB_URI  || process.env.MONGO_DB_KEY)


// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`server live at ` +  chalk.bgBlue(`http://localhost:${PORT}`) + '\n ' + chalk.bgMagenta(`http://localhost:${PORT}/api/users`));
});