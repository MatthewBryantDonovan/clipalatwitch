/////////////////  Dependencies /////////////////
const db = require("../models");

// Defining methods for the clipRiverController
module.exports = {

    // Method to get the clip river
    getRiver: function(req, res) {

        db.ClipRiver
        .find({})
        .sort({value: -1})
        .then(function(data){
            res.json(data);
        })
        .catch(function(err){
            res.status(422).json(err);
        });
        
    },

    // Will require body {clipType: clipType, _id: _id}
    // Check ClipRiver model for possible clipType's
    // Method for type-ing a clip
    clipType: function (req, res) {

        // Update function to take in dynamic clipType
        function update(type){
            db.ClipRiver
            .updateOne({_id: req.body._id}, type)
            .then(function(data){
                res.json({msg: "success"});
            })
            .catch(function(err){
                res.status(422).json(err);
            });
        }
        
        // If user session exists
        if(req.session.passport){

            // See if clip exists
            db.ClipRiver
            .findOne({_id: req.body._id})
            .then(function(data){

                // Did user already type it
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
                    res.json({msg: "user already typed this one"});
                }
            }).catch(function(err){
                res.status(422).json(err);
            });
        } else {
            res.status(422).json({msg: "No user logged in"});
        }

    }

};