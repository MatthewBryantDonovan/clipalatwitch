const db = require("../models");
const axios = require("axios");
const chalk = require("chalk")

// Defining methods for the booksController
module.exports = {


  // When saving a streamer/game the following object needs sent
  // {
  //   "id": req.body.streamerID,
  //   "name": req.body.streamerName,
  //   "image": req.body.streamerImage,
  //   username: req.body.username
  // }
  saveStreamer: function(req, res) {
    db.User
    .update({ username: req.body.username}, 
    {$push: 
      {"streamers": 
        { 
          id: req.body.streamerID,
          name: req.body.streamerName,
          image: req.body.streamerImage
        }
      }
    })
    .then(dbModel => {
      console.log(dbModel);

      res.json({message: "streamer saved"})
      
    })
    .catch(err => res.status(422).json(err));
  },

  saveGame: function(req, res) {
    db.User
    .update({ username: req.body.username}, 
    {$push: 
      {"streamers": 
        { 
          id: req.body.gameID,
          name: req.body.gameName,
          image: req.body.gameImage
        }
      }
    })
    .then(dbModel => {
      console.log(dbModel);

      res.json({message: "streamer saved"})
      
    })
    .catch(err => res.status(422).json(err));
  },

  userSavedInfo: function(req, res) {
    db.User
    .findOne({ username: req.body.username})
    .then(dbModel => {
      let resObj = {
        streamers: dbModel.streamers,
        games: dbModel.games
      }

      res.json(resObj);
    })
    .catch(err => res.status(422).json(err));
  },

  viewClips:  function(req, res) {

    if (req.params.type === "streamer"){
      let streamerID = req.params.id;
      let x_query_clips = "https://api.twitch.tv/helix/clips?broadcaster_id=" + (streamerID);

      axios.get((x_query_clips), {
          headers: {
              'Client-ID': process.env.TWITCH_API_KEY
          }
      }).then(function (response) {
        console.log(response.data.data);

        let resObject = {
          clips: response.data.data,
        }

        console.log(chalk.bgRed("~~~~~~~~ resObject Start ~~~~~~~~"));
        console.log(resObject);
        console.log(chalk.bgRed("~~~~~~~~ resObject End ~~~~~~~~"));

        res.json(resObject)
      }).catch(function (err) {
          console.log(err);
      });
    } else if (req.params.type === "game"){
      let gameID = req.params.id;
      let x_query_game = "https://api.twitch.tv/helix/clips?game_id=" + (gameID);

      axios.get((x_query_game), {
          headers: {
              'Client-ID': process.env.TWITCH_API_KEY
          }
      }).then(function (response) {
        console.log(response.data.data);

        let resObject = {
          clips: response.data.data,
        }

        console.log(chalk.bgRed("~~~~~~~~ resObject Start ~~~~~~~~"));
        console.log(resObject);
        console.log(chalk.bgRed("~~~~~~~~ resObject End ~~~~~~~~"));

        res.json(resObject)
      }).catch(function (err) {
          console.log(err);
      });
    }
  },

  //need to send the following object
  // {
  //   "id": req.body.ID,
  //   "type": req.body.type,
  //   "likedContent": req.body.likedContent,
  //   username: req.body.username
  // }
  saveClip:  function(req, res) {

    if(req.body.type === "streamer"){
      db.User
      .update({ username: req.body.username,
        streamers:
          {
            $elemMatch: {streamers: req.body.id} 
          }
      }, 
      {$push: {"streamers.$.likedContent": req.body.likedContent}
      })
      .then(dbModel => {
        console.log(dbModel);
  
        res.json({message: "streamer clip saved"})
        
      })
      .catch(err => res.status(422).json(err));
    } else if ( req.body.type === "game" ){
      db.User
      .update({ username: req.body.username,
        games:
          {
            $elemMatch: {games: req.body.id} 
          }
      }, 
      {$push: {"games.$.likedContent": req.body.likedContent}
      })
      .then(dbModel => {
        console.log(dbModel);
  
        res.json({message: "game clip saved"})
        
      })
      .catch(err => res.status(422).json(err));
    }
  }
  
};
