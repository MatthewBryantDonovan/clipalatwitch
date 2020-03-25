/////////////////  Dependencies /////////////////
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

// User Schema
const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  userImage: String,
  streamers: [{
    id: String,
    name: String,
    image: String,
    likedContent: [String]
  }],
  games: [{
    id: String,
    name: String,
    image: String,
    likedContent: [String]
  }],
  userSince: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now }
});

// Before the schema is used generate hash password
userSchema.pre("save", function(next) {
  var user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // Generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // Hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // Override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
  });


});

// Compares hash password and un-hash password
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

// Mongoose model for User
const User = mongoose.model("User", userSchema);

// Exporting User
module.exports = User;