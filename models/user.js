const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

const User = mongoose.model("User", userSchema);

module.exports = User;
