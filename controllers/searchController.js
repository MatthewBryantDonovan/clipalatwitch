/////////////////  Dependencies /////////////////
const axios = require("axios");

// Defining methods for the searchController
module.exports = {

  // Method to search a streamer
  searchStreamer: function(req, res) {
    let streamerName = req.params.streamer;
    let x_query_streamer = "https://api.twitch.tv/helix/users?login=" + (streamerName);
    axios.get((x_query_streamer), {
        headers: {
            'Authorization': 'Bearer ' + req.session.passport.twitchToken,
            'Client-ID': process.env.TWITCH_API_KEY
        }
    })
    .then(function (response) {
      var streamerID = response.data.data[0].id;
      let streamerDisplay_Name = response.data.data[0].display_name;
      let streamerProfile_Image_Url = response.data.data[0].profile_image_url;
      
      //RFC 3339 format
      var date = new Date();
      var formatted = date.toISOString(date.setDate(date.getDate() + 1));
      formatted = formatted.slice(0, -13) + "00:00:00Z";
      var oldDate = new Date;
      var oldFormatted = oldDate.toISOString(oldDate.setDate(oldDate.getDate() - 3));
      oldFormatted = oldFormatted.slice(0, -13) + "00:00:00Z";

      let x_query_clips = "https://api.twitch.tv/helix/clips?broadcaster_id=" + (streamerID) + "&started_at=" + (oldFormatted) + "&ended_at=" + (formatted) + "&first=100";
      axios.get((x_query_clips), {
        headers: {
            'Authorization': 'Bearer ' + req.session.passport.twitchToken,
            'Client-ID': process.env.TWITCH_API_KEY
        }
      })
      .then(function (response) {
        if(response.data.data.length == 0){
          let x_query_clips = "https://api.twitch.tv/helix/clips?broadcaster_id=" + (streamerID) + "&first=100";
          axios.get((x_query_clips), {
            headers: {
                'Authorization': 'Bearer ' + req.session.passport.twitchToken,
                'Client-ID': process.env.TWITCH_API_KEY
            }
          })
          .then(function (response) {
            let resObject = {
              clips: response.data.data,
              streamerID: streamerID,
              streamerName: streamerDisplay_Name,
              streamerImage: streamerProfile_Image_Url
            }

            res.json(resObject);
          })
          .catch(err => res.status(422).json(err));
  
        } else {
          let resObject = {
            clips: response.data.data,
            streamerID: streamerID,
            streamerName: streamerDisplay_Name,
            streamerImage: streamerProfile_Image_Url
          }
          
          res.json(resObject);
        }
      })
      .catch(err => res.status(422).json(err));

    })
    .catch(err => res.status(422).json(err));

  },

  // Method to search a game
  searchGame: function(req, res) {
    
    //Common game's searched with the acute accent 
    let gameQueryName = encodeURIComponent(req.params.game).toLowerCase();
    if(gameQueryName.toLowerCase()){
      gameQueryName = gameQueryName.replace("pokemon", "pok%C3%A9mon");
    }
    let x_query_game = "https://api.twitch.tv/helix/games?name=" + (gameQueryName);
    axios.get((x_query_game), {
      headers: {
          'Authorization': 'Bearer ' + req.session.passport.twitchToken,
          'Client-ID': process.env.TWITCH_API_KEY
      }
    })
    .then(function (response) {
      var gameID = response.data.data[0].id;
      let gameName = response.data.data[0].name;
      let streamerBox_Art_Url = response.data.data[0].box_art_url;
      streamerBox_Art_Url = streamerBox_Art_Url.replace("{width}", "100");
      streamerBox_Art_Url = streamerBox_Art_Url.replace("{height}", "125");

      //RFC 3339 format
      var date = new Date();
      var formatted = date.toISOString(date.setDate(date.getDate() + 1));
      formatted = formatted.slice(0, -13) + "00:00:00Z";
      var oldDate = new Date;
      var oldFormatted = oldDate.toISOString(oldDate.setDate(oldDate.getDate() - 3));
      oldFormatted = oldFormatted.slice(0, -13) + "00:00:00Z";

      let x_query_game = "https://api.twitch.tv/helix/clips?game_id=" + (gameID) + "&started_at=" + (oldFormatted) + "&ended_at=" + (formatted) + "&first=100";
      axios.get((x_query_game), {
          headers: {
              'Authorization': 'Bearer ' + req.session.passport.twitchToken,
              'Client-ID': process.env.TWITCH_API_KEY
          }
      })
      .then(function (response) {
        if(response.data.data.length == 0){
          let x_query_game = "https://api.twitch.tv/helix/clips?game_id=" + (gameID) + "&first=100";
          axios.get((x_query_game), {
            headers: {
                'Authorization': 'Bearer ' + req.session.passport.twitchToken,
                'Client-ID': process.env.TWITCH_API_KEY
            }
          })
          .then(function (response) {
            let resObject = {
              clips: response.data.data,
              gameID: gameID,
              gameName: gameName,
              gameImage: streamerBox_Art_Url
            }
  
            res.json(resObject);
          })
          .catch(err => res.status(422).json(err));
        } else {
          let resObject = {
            clips: response.data.data,
            gameID: gameID,
            gameName: gameName,
            gameImage: streamerBox_Art_Url
          }

          res.json(resObject);
        }
      })
      .catch(err => res.status(422).json(err));
    })
    .catch(err => res.status(422).json(err));
  }
  
};