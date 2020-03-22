const db = require("../models");
const passport = require("passport");

// Defining methods for the usersController
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
            dbModel.password = "";
            
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

    // console.log("here");
    
    // passport.authenticate('local', 
    // {
    //   successRedirect: "/",
    //   failureRedirect: "/login",
    //   failureFlash: true
    // }
    // );

    console.log("here");
    
    res.json("did it");
    
  },

  logout: function(req, res) {
    if(req.session.passport){
      console.log(req.session.passport);
      if(req.session.passport.user){
        console.log("user exists");
        req.logOut();
        console.log("logout happened");
        res.json("User Logout");
      } else {
        console.log("user didn't exist");
        res.status(422).json("No user logged in")
      }
    } else {
      res.status(422).json("No user logged in")
    }

  },

  updateImage:  function(req, res){
    db.User
    .findByIdAndUpdate(req.session.passport.user,
      req.body.userImage,
      {new: true},
      )
    .then(() => {
      res.json({msg: db.User.userImage})
    })
    .catch(err => res.status(422).json(err));
  }
};
