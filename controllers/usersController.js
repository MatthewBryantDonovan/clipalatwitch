const db = require("../models");
const axios = require("axios");

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
    db.User.findOne({ username: req.body.username})
      .then(function(user){
  
      // test a matching password
      user.comparePassword(req.body.password, function(err, isMatch) {
          if (err) throw err;
          if(isMatch){
            res.json(user) // FIXME:send without password data needed
          } else {
            res.status(401).json({err: "Password is incorrect"});
          }
      });
    }).catch(err => res.status(422).json(err));
  }
  
};
