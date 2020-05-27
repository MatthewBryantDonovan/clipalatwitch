/////////////////  Dependencies /////////////////
const axios = require("axios");

// Defining methods for the getOauthController
module.exports = {
    
    // Method to get Oauth Token
    getOauth: function(req, res) {

        let x_query_getOauth = "https://id.twitch.tv/oauth2/token?client_id="+process.env.TWITCH_API_KEY+"&client_secret="+process.env.TWITCH_SECRET+"&grant_type=client_credentials";

        axios.post((x_query_getOauth))
        .then(function (response) {

            req.session.passport.twitchToken = response.data.access_token;
            res.json({msg: "Obtained Token"});
            
        }).catch( function (err){
            res.status(422).json(err)
        });
        
    }
}