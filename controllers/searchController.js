const db = require("../models");
const axios = require("axios");
const chalk = require("chalk")

// Defining methods for the booksController
module.exports = {

  searchStreamer: function(req, res) {
    let streamerName = req.params.streamer;
    let x_query_streamer = "https://api.twitch.tv/helix/users?login=" + (streamerName);

    axios.get((x_query_streamer), {
        headers: {
            'Client-ID': process.env.TWITCH_API_KEY
        }
    }).then(function (response) {
      let streamerID = response.data.data[0].id;
      let streamerDisplay_Name = response.data.data[0].display_name;
      let streamerProfile_Image_Url = response.data.data[0].profile_image_url;
      // console.log(response.data.data[0]);

      let x_query_clips = "https://api.twitch.tv/helix/clips?broadcaster_id=" + (streamerID);

      axios.get((x_query_clips), {
          headers: {
              'Client-ID': process.env.TWITCH_API_KEY
          }
      }).then(function (response) {
        // console.log(response.data.data);

        let resObject = {
          clips: response.data.data,
          streamerID: streamerID,
          streamerName: streamerDisplay_Name,
          streamerImage: streamerProfile_Image_Url
        }

        // console.log(chalk.bgRed("~~~~~~~~ resObject Start ~~~~~~~~"));
        // console.log(resObject);
        // console.log(chalk.bgRed("~~~~~~~~ resObject End ~~~~~~~~"));

        res.json(resObject)

      }).catch(function (err) {
          console.log(err);
      });

    }).catch(function (err) {
      console.log(err);
    });

  },

  //size of games blow in replace function calls
  searchGame: function(req, res) {
    let gameQueryName = encodeURIComponent(req.params.game).toLowerCase();
    if(gameQueryName.toLowerCase()){
      gameQueryName = gameQueryName.replace("pokemon", "pok%C3%A9mon")
    }
    let x_query_game = "https://api.twitch.tv/helix/games?name=" + (gameQueryName);

    console.log(x_query_game);
    

    axios.get((x_query_game), {
        headers: {
            'Client-ID': process.env.TWITCH_API_KEY
        }
    }).then(function (response) {

        let gameID = response.data.data[0].id;
        let gameName = response.data.data[0].name;
        let streamerBox_Art_Url = response.data.data[0].box_art_url;
        streamerBox_Art_Url = streamerBox_Art_Url.replace("{width}", "100");
        streamerBox_Art_Url = streamerBox_Art_Url.replace("{height}", "125");
        let x_query_game = "https://api.twitch.tv/helix/clips?game_id=" + (gameID);

        axios.get((x_query_game), {
            headers: {
                'Client-ID': process.env.TWITCH_API_KEY
            }
        }).then(function (response) {
          // console.log(response.data.data);
  
          let resObject = {
            clips: response.data.data,
            gameID: gameID,
            gameName: gameName,
            gameImage: streamerBox_Art_Url
          }
  
          // console.log(chalk.bgRed("~~~~~~~~ resObject Start ~~~~~~~~"));
          // console.log(resObject);
          // console.log(chalk.bgRed("~~~~~~~~ resObject End ~~~~~~~~"));
  
          res.json(resObject)
        }).catch(function (err) {
            console.log(err);
        });
    }).catch(function (err) {
        console.log(err);
    });
  }
  
};
