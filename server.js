/////////////////  Dependencies /////////////////
const express = require('express');
const orm = require('mongoose');
const routes = require("./routes");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const initializePassport = require("./config/passport");
const passport = require("passport");
const session = require("express-session");
const db = require("./models");
const chalk = require('chalk');

// Use dotenv file if not in production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

//  Use the build file within client for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

///////////////// Passport Set up Start /////////////////
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

initializePassport(

  passport, username => {
    return (db.User.findOne({username: username})
    .then((user) => 
      {if (user){return user} else {return null}
      }
    ));
  },
  id => {
    return (db.User.findOne({id: id})
    .then((user) => 
      {if (user){return user.id} else {return null}
      }
    ));
  }

);

// Add to anything you want to check authenticated
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

// Add to anything you want to check not authenticated
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }

  next();
}

///////////////// Passport Set up End /////////////////

// Use the routes declared in the dependencies section
app.use(routes);

// Connect to the NoSQL database ( production || development)
orm.connect(process.env.MONGODB_URI  || process.env.MONGO_DB_KEY);

// Send every other request to the React app
// Define any API routes before this
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


// Start listening on PORT
app.listen(PORT, () => {
  console.log(`server live at ` +  chalk.bgBlue(`http://localhost:${PORT}`) + '\n ' + chalk.bgMagenta(`http://localhost:${PORT}/api/users`));
});