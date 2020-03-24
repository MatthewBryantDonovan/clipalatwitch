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

        function update(type){
            db.ClipRiver.updateOne({_id: req.body._id}, type).then(function(data){
                console.log(data);
                console.log(chalk.bgGreen("user typed it"));
                res.json({msg: "success"});
            }).catch(function(err){
                console.log(chalk.red("update error"));
                res.status(422).json(err);
            });
        }
        
        
        if(req.session.passport){
            
            db.ClipRiver.findOne({_id: req.body._id}).then(function(data){
                
                if (data.typedUsers.indexOf(req.session.passport.user) === -1){
                    switch (req.body.clipType){

                        case "clutchType":
                            var type = {$inc: {value: 2, clutchType: 1}, $push: {typedUsers: req.session.passport.user}};
                            update(type);
                            return;
                        case "comboType":
                            var type = {$inc: {value: 2, comboType: 1}, $push: {typedUsers: req.session.passport.user}};
                            update(type);
                            break;
                        case "failType":
                            var type = {$inc: {value: 2, failType: 1}, $push: {typedUsers: req.session.passport.user}};
                            update(type);
                            break;
                        case "funnyType":
                            var type = {$inc: {value: 2, funnyType: 1}, $push: {typedUsers: req.session.passport.user}};
                            update(type);
                            break;
                        case "hypeType":
                            var type = {$inc: {value: 2, hypeType: 1}, $push: {typedUsers: req.session.passport.user}};
                            update(type);
                            break;

                    }

                    
                } else {
                    console.log(chalk.red("user already liked"));
                    
                    res.json({msg: "user already typed this one"});
                }
            }).catch(function(err){
                console.log(chalk.red("find error"));
                res.status(422).json(err);
            });

        } else {
            console.log(chalk.red("No user logged in"));
            
            res.status(422).json("No user logged in")
        }

    }

};