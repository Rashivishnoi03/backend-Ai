const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  query: {
    type: String,
    required: true,
  },
  searchedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("History", historySchema);
