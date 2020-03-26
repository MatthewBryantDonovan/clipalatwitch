/////////////////  Dependencies /////////////////
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// ClipRiver Schema
const clipRiverSchema = new Schema({
  url: { type: String, required: true },
  type: String,
  typeID: String,
  ID: String,
  title: String,
  thumbnail: String,
  value: { type: Number, required: true },
  likedUsers: [String],
  typedUsers: [String],
  clutchType: { type: Number, default: 0 },
  comboType: { type: Number, default: 0 },
  failType: { type: Number, default: 0 },
  funnyType: { type: Number, default: 0 },
  hypeType: { type: Number, default: 0 }
});

// Mongoose model for ClipRiver
const ClipRiver = mongoose.model("ClipRiver", clipRiverSchema);

// Exporting ClipRiver
module.exports = ClipRiver;