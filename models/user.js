const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

////////////////// FIXME: TEST //////////////////
// var passport = require("passport")
////////////////// FIXME: TEST //////////////////

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  userImage: String,
  streamers: [{
    name: String,
    image: String,
    likedContent: String
  }],
  games: [{
    name: String,
    image: String,
    likedContent: String
  }],
  userSince: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now }
});

userSchema.pre("save", function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
  });


});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};


const User = mongoose.model("User", userSchema);

////////////////// FIXME: TEST //////////////////
// module.exports.createUser = function(newUser, callback){
//   bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash(newUser.password, salt, function(err, hash) {
//       newUser.password = hash;
//       newUser.save(callback);
//     });
//   });
// }

// module.exports.getUserByUsername = function(username, callback){
//   var query = {username: username};
//   User.findOne(query, callback);
// }

// module.exports.getUserById = function(id, callback){
//   User.findById(id, callback);
// }

// module.exports.comparePassword = function(candidatePassword, hash, callback){
//   bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
//     if(err) throw err;
//     callback(null, isMatch);
//   });
// }

// // var LocalStrategy = require('passport-local').Strategy;
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.getUserByUsername(username, function(err, user){
//       if(err) throw err;
//       if(!user){
//         return done(null, false, {message: 'Unknown User'});
//       }
//       User.comparePassword(password, user.password, function(err, isMatch){
//         if(err) throw err;
//      	if(isMatch){
//      	  return done(null, user);
//      	} else {
//      	  return done(null, false, {message: 'Invalid password'});
//      	}
//      });
//    });
//   }
// ));

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.getUserById(id, function(err, user) {
//     done(err, user);
//   });
// });
////////////////// FIXME: TEST //////////////////

module.exports = User;