const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  userImage: String,
  streamers: [{
    name: { type: String, required: true },
    image: { type: String, required: true },
    likedContent: { type: String, required: true }
  }],
  games: [{
    name: { type: String, required: true },
    image: { type: String, required: true },
    likedContent: { type: String, required: true }
  }],
  userSince: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
