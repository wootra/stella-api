const mongoose = require("mongoose");

const gallarySchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: mongoose.Schema.Types.String, required: true },
  whenBuyOrReceive: mongoose.Schema.Types.Date,
  whoBuy: mongoose.Schema.Types.String,
  whereBuy: mongoose.Schema.Types.String,
  whereAddr: mongoose.Schema.Types.String,
  imageOrg: mongoose.Schema.Types.Buffer,
  imageIcon: mongoose.Schema.Types.Buffer,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  categoryName: mongoose.Schema.Types.String,

  nick: { type: mongoose.Schema.Types.String, required: true },
  join: { type: mongoose.Schema.Types.Date, required: true },
  email: { type: mongoose.Schema.Types.String, required: true },
  password: { type: mongoose.Schema.Types.String, required: true },
  loggedIn: mongoose.Schema.Types.Boolean,
  permission: { type: mongoose.Schema.Types.Number, required: true }
});

module.exports = mongoose.model("Gallary", gallarySchema);
