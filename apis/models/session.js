const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  expire: { type: mongoose.Schema.Types.Date, required: true },
  nick: { type: mongoose.Schema.Types.String, required: true },
  permission: { type: mongoose.Schema.Types.Number, required: true }
});

module.exports = mongoose.model("Session", sessionSchema);
