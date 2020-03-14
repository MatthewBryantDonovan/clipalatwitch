const db = require("../models");
const axios = require("axios");
const chalk = require("chalk")

// Defining methods for the booksController
module.exports = {

  streamer: function(req, res) {
    var streamerName = req.params.streamer;
    var x_query_streamer = "https://api.twitch.tv/helix/users?login=" + (streamerName);

    axios.get((x_query_streamer), {
        headers: {
            'Client-ID': process.env.TWITCH_API_KEY
        }
    }).then(function (response) {
      let streamerID = response.data.data[0].id;
      let streamerDisplay_Name = response.data.data[0].display_name;
      let streamerProfile_Image_Url = response.data.data[0].profile_image_url;
      console.log(response.data.data[0]);
      console.log(response.data.data[0].id);

      let x_query_clips = "https://api.twitch.tv/helix/clips?broadcaster_id=" + (streamerID);

      axios.get((x_query_clips), {
          headers: {
              'Client-ID': process.env.TWITCH_API_KEY
          }
      }).then(function (response) {
        console.log("/////////////////////////////////////////\n/////////////////////////////////////////\n/////////////////////////////////////////\n/////////////////////////////////////////\n");
        
        console.log(response.data.data);

        let resObject = {
          clips: response.data.data,
          streamerID: streamerID,
          streamerName: streamerDisplay_Name,
          streamerImage: streamerProfile_Image_Url
        }

        console.log(chalk.bgRed(resObject));
        console.log(resObject);
        

        res.json(resObject)

      }).catch(function (err) {
          console.log(err);
          console.log("ASDFASDFJASLDKFJALSJDFLJASLKDFJLASJDFLASJDLFKJASDLKFJ");

      });

    }).catch(function (err) {
      console.log(err);
    });

  },

  game: function(req, res) {
    
  }
  
};
