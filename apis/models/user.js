const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  nick: { type: String, required: true },
  join: { type: Date, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  loggedIn: Boolean,
  permission: { type: Number, required: true }
});

module.exports = mongoose.model("User", userSchema);
