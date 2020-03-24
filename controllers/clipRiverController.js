const db = require("../models");
const axios = require("axios");
const chalk = require("chalk")

// Defining methods for the clipRiverController
module.exports = {

    getRiver: function(req, res) {
        console.log("entered get River");
        

        db.ClipRiver.find({}).sort({value: -1}).then(function(data){
            console.log(chalk.green("found " + data.length + " documents"));
            res.json(data);
        }).catch(function(err){
            res.status(422).json(err)
        });

        
    },

    // will require body 
    // {
        // clipType: clipType
    // }
    // ( can any of the below )
    // clutchType
    // comboType
    // failType
    // funnyType
    // hypeType
    clipType: function (req, res) {

        if(req.session.passport){
            let type = req.body.clipType
            db.ClipRiver.updateOne({_id: req.session.passport.user}, {$inc: {[req.body.clipType]: 1}}).then(function(data){
                console.log(data);
                res.status(422).json({msg: "success"});
            }).catch(function(err){
                res.status(422).json(err);
            });

        } else {
            res.status(422).json("No user logged in")
        }

    }

};