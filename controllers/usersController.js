const db = require("../models");
const axios = require("axios");

// Defining methods for the booksController
module.exports = {
  userLogin: function(req, res) {
    //FIXME: Choose which data to give back.
    db.User
      .findOne(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {

    db.User
    .findOne(req.body)
    .then(dbModel => {
      
      if(!dbModel){
         // New user
        
        db.User
          .collection.insert(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      } else {
        // user exists
        
        res.json(dbModel)
      }
    })
    .catch(err => res.status(422).json(err));

  }
};
