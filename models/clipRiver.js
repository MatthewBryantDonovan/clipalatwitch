const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clipRiverSchema = new Schema({
  url: { type: String, required: true },
  value: { type: Number, required: true },
  likedUsers: [String],
  typedUsers: [String]
});


const ClipRiver = mongoose.model("ClipRiver", clipRiverSchema);

module.exports = ClipRiver;