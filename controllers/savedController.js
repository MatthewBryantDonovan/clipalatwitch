/////////////////  Dependencies /////////////////
const db = require("../models");
const axios = require("axios");

// Defining methods for the savedController
module.exports = {

  // When saving a streamer/game the following object needs sent
  // {
  //   "id": req.body.streamerID,
  //   "name": req.body.streamerName,
  //   "image": req.body.streamerImage,
  // }

  // Method to save a streamer
  saveStreamer: function(req, res) {

    // See if there is a user in session
    if (req.session.passport){

      // See if user saved streamer
      db.User
      .findOne({ _id: req.session.passport.user, streamers: { $elemMatch: {id: req.body.id} }}).then(function(data){

        // Add streamer to User
        if(!data){
          db.User
          .updateOne({ _id: req.session.passport.user}, 
            {$push: 
              {"streamers": 
                { 
                  id: req.body.id,
                  name: req.body.name,
                  image: req.body.image
                }
              }
            })
          .then(dbModel => {
            res.json({msg: "streamer saved"});
          })
          .catch(err => res.status(422).json(err));
        } else{
          res.status(422).json({msg: "Streamer Already Exists"});
        }
      })
      .catch(err => res.status(422).json(err));
    } else {
      res.status(422).json({msg: "user is not authenticated"});
    }

  },

  // Method to save a game
  saveGame: function(req, res) {

    // See if there is a user in session
    if (req.session.passport){

      // See if user saved gamed
      db.User.findOne({ _id: req.session.passport.user, games: { $elemMatch: {id: req.body.id} }}).then(function(data){
        if(!data){

          // Saved game to user
          db.User
          .updateOne({ _id: req.session.passport.user}, 
          {$push: 
            {"games": 
              { 
                id: req.body.id,
                name: req.body.name,
                image: req.body.image
              }
            }
          })
          .then(dbModel => {
            res.json({msg: "Game saved"});
          })
          .catch(err => res.status(422).json(err));
        } else{
          res.status(422).json({msg: "Game Already Exists"});
        }
      })
      .catch(err => res.status(422).json(err));
    } else {
      res.status(422).json({msg: "user is not authenticated"});
    }
  },

  // Method to get user's id and saved info
  userSavedInfo: function(req, res) {

    // See if there is a user in session
    if (req.session.passport){

      // Get user info
      db.User
      .findOne({ _id: req.session.passport.user})
      .then(dbModel => {
        let resObj = {
          _id: dbModel._id,
          streamers: dbModel.streamers,
          games: dbModel.games,
          username: dbModel.username,
          userImage: dbModel.userImage
        }
  
        res.json(resObj);
      })
      .catch(err => res.status(422).json(err));
    } else {
      res.status(422).json({msg: "user is not authenticated"});
    }

  },

  // Method for viewing streamer/game clips
  viewClips:  function(req, res) {

    // Streamer or game calls to get clips
    if (req.params.type === "streamer"){
      let streamerID = req.params.id;
      let x_query_clips = "https://api.twitch.tv/helix/clips?broadcaster_id=" + (streamerID);

      // Twitch call
      axios.get((x_query_clips), {
          headers: {
              'Client-ID': process.env.TWITCH_API_KEY
          }
      }).then(function (response) {
        let resObject = {
          clips: response.data.data,
        }

        res.json(resObject);
      })
      .catch(err => res.status(422).json(err));
    } else if (req.params.type === "game"){
      let gameID = req.params.id;
      let x_query_game = "https://api.twitch.tv/helix/clips?game_id=" + (gameID);

      // Twitch call
      axios.get((x_query_game), {
          headers: {
              'Client-ID': process.env.TWITCH_API_KEY
          }
      }).then(function (response) {
        let resObject = {
          clips: response.data.data,
        }

        res.json(resObject);
      })
      .catch(err => res.status(422).json(err));
    }

  },

  // Method to save a clip - and - send it to the clip river
  saveClip:  function(req, res) {

    // See if there is a user in session
    if (req.session.passport){

      if(req.body.type === "streamer"){

        // See if clip is already saved
        db.User
        .findOne({ _id: req.session.passport.user, streamers: { $elemMatch: {likedContent: req.body.clipID} } })
        .then(function(data){
          if(!data){

            // Add Clip to user
            db.User
            .updateOne({ _id: req.session.passport.user,
              streamers:
                {
                  $elemMatch: {id: req.body.typeID} 
                }
            }, 
            {$push: {"streamers.$.likedContent": req.body.clipID}
            })
            .then(dbModel => {
              ////////////// START CLIP RIVER //////////////

              // See if clip river contains clip
              db.ClipRiver
              .findOne({url: req.body.clipID})
              .then(data => {
                if (!data){

                  // Add clip to clip river and add user to likedUsers
                  db.ClipRiver
                  .create({url: req.body.clipID, value: 5, likedUsers: [req.session.passport.user]})
                  .then(dbModel => {
                    res.json({msg: "streamer clip saved"}); 
                  })
                  .catch(err => res.status(422).json(err));

                } else {
                  if (data.likedUsers.indexOf(req.session.passport.user) === -1){

                    // Add user to likedUsers within clip river
                    db.ClipRiver
                    .findOneAndUpdate({url: req.body.clipID}, {$push: {likedUsers: req.session.passport.user}, $inc: {value: 5 }})
                    .then(dbModel => {
                      res.json({msg: "streamer clip saved"}); 
                    })
                    .catch(err => res.status(422).json(err));

                  } else {
                    res.json({msg: "streamer clip saved"}); 
                  }
                }
                
              })
              .catch(err => res.status(422).json(err));
            ////////////// END CLIP RIVER //////////////
            })
            .catch(err => res.status(422).json(err));
          } else{
            res.status(422).json({msg: "Clip Exists"});
          }
        })
        .catch(err => res.status(422).json(err));
      } else if ( req.body.type === "game" ){

        // See if clip is already saved
        db.User
        .findOne({ _id: req.session.passport.user, games: { $elemMatch: {likedContent: req.body.clipID} } }).then(function(data){
          if(!data){

            // Add clip to user
            db.User
            .updateOne({ _id: req.session.passport.user,
              games:
                {
                  $elemMatch: {id: req.body.typeID} 
                }
            }, 
            {$push: {"games.$.likedContent": req.body.clipID}
            })
            .then(dbModel => {
        
              ////////////// START CLIP RIVER //////////////

              db.ClipRiver
              .findOne({url: req.body.clipID})
              .then(data => {
                if (!data){

                  // Add clip to clip river and add user to likedUsers
                  db.ClipRiver
                  .create({url: req.body.clipID, value: 5, likedUsers: [req.session.passport.user]})
                  .then(dbModel => {
                    res.json({msg: "game clip saved"}); 
                  })
                  .catch(err => res.status(422).json(err));

                } else {

                  if (data.likedUsers.indexOf(req.session.passport.user) === -1){

                    // Add user to likedUsers within clip river
                    db.ClipRiver
                    .findOneAndUpdate({url: req.body.clipID}, {$push: {likedUsers: req.session.passport.user},  $inc: {value: 5 } })
                    .then(dbModel => {
                      res.json({msg: "game clip saved"}); 
                    })
                    .catch(err => res.status(422).json(err));

                  } else {
                    res.json({msg: "game clip saved"}); 
                  }
                }
                
              })
              .catch(err => res.status(422).json(err));

              ////////////// END CLIP RIVER //////////////
              
            })
            .catch(err => res.status(422).json(err));
          } else{
            res.status(422).json({msg: "Clip Exists"});
          }
        })
        .catch(err => res.status(422).json(err));
      }

    } else {
      res.status(422).json({msg: "user is not authenticated"});
    }

  },

  // Method to remove a streamer or game
  removeStreamerOrGame: function(req, res) {
    
    // See if there is a user in session
    if (req.session.passport){

      if(req.params.type === "streamer"){

        // Remove streamer from user
        db.User
          .updateOne({ _id: req.session.passport.user}, 
          {$pull: 
            {"streamers": 
              { 
                id: req.params.id
              }
            }
          })
          .then(dbModel => {
            res.json({msg: "Streamer removed"});
          })
          .catch(err => res.status(422).json(err));
      } else if ( req.params.type === "game" ){

        // Remove game from user
        db.User
          .updateOne({ _id: req.session.passport.user}, 
          {$pull: 
            {"games": 
              { 
                id: req.params.id
              }
            }
          })
          .then(dbModel => {
            res.json({msg: "Game removed"});
          })
          .catch(err => res.status(422).json(err));
      }
    } else {
      res.status(422).json({msg: "user is not authenticated"});
    }

  }
  
};