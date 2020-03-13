const db = require("../models");
const axios = require("axios");
const passport = require("passport");

// Defining methods for the booksController
module.exports = {

  create: function(req, res) {

    db.User
    .findOne({ username: req.body.username})
    .then(dbModel => {
      
      if(!dbModel){
        // New user
        console.log("creating");
        
        db.User.create(req.body)
          .then(dbModel => {
            console.log(dbModel);
            
            res.json(dbModel)
              //FIXME: need to send completed only
          })
          .catch(err => res.status(422).json(err));
      } else {
        // user exists
        console.log("exists already");
        res.status(409).json({Error: "User name already Exists"})
        //FIXME: need to see how to send a message
      }
    })
    .catch(err => res.status(422).json(err));

  },

  userLogin: function(req, res) {

    ///////////////////////// Original
    // db.User.findOne({ username: req.body.username})
    //   .then(function(user){
  
    //   // test a matching password
    //   
    
    // }).catch(err => res.status(422).json(err));
    ///////////////////////// Original 

    ///////////////////////// FIXME: New 

    // passport.authenticate('local', {
    //   successRedirect: "/",
    //   failureRedirect: "/login",
    //   failureFlash: true
    // })

    passport.authenticate('local')
    
  }
  
};
