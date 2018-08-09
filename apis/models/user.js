const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  lastName: { type: mongoose.Schema.Types.String, required: true },
  firstName: { type: mongoose.Schema.Types.String, required: true },
  nick: { type: mongoose.Schema.Types.String, required: true },
  join: { type: mongoose.Schema.Types.Date, required: true },
  email: { type: mongoose.Schema.Types.String, required: true },
  password: { type: mongoose.Schema.Types.String, required: true },
  loggedIn: mongoose.Schema.Types.Boolean,
  permission: { type: mongoose.Schema.Types.Number, required: true }
});

module.exports = mongoose.model("User", userSchema);
