const db = require("../models");
const axios = require("axios");
const chalk = require("chalk")

// Defining methods for the clipRiverController
module.exports = {

    getRiver: function(req, res) {
        console.log("entered get River");
        

        db.ClipRiver.find({}).then(function(data){
            console.log(chalk.green("found " + data.length + " documents"));
            res.json(data);
        }).catch(function(err){
            res.status(422).json(err)
        });

        
    }

    // commentRiver: function(req, res) {
        
    // }

};