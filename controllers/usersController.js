/////////////////  Dependencies /////////////////
const db = require("../models");

// Defining methods for the usersController
module.exports = {

  // Method for creating user
  create: function(req, res) {

    // See if user exists
    db.User
    .findOne({ username: req.body.username})
    .then(dbModel => {
      if(!dbModel){

        // Create user
        db.User
        .create(req.body)
        .then(dbModel => {
          dbModel.password = "";
          res.json(dbModel);
        })
        .catch(err => res.status(422).json(err));
      } else {

        // User exists
        res.status(409).json({msg: "User name already Exists"});
      }
    })
    .catch(err => res.status(422).json(err));

  },

  // Method for user login
  userLogin: function(req, res) {

    // This route is completed by passport before it hits the controller

  },

  // Method for user logout
  logout: function(req, res) {

    // See if user session exists
    if(req.session.passport){
      if(req.session.passport.user){

        // Logout user
        req.logOut();
        res.json({msg: "User Logout"});
      } else {
        res.status(422).json({msg: "No user logged in"});
      }
    } else {
      res.status(422).json({msg: "No user logged in"});
    }

  },

  updateImage: function(req, res){

    // See if user session exists
    if(req.session.passport){

      // Update user image
      db.User
      .update( {_id: req.session.passport.user}, {userImage: req.body.userImage})
      .then(() => {
        res.json({msg: "success"});
      })
      .catch(err => res.status(422).json(err));
    } else {
      res.status(422).json({msg: "No user logged in"});
    }

  }

};
