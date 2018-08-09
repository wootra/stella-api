const mongoose = require("mongoose");

const toySchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  whenBuyOrReceive: Date,
  whoBuy: String,
  whereBuy: String,
  whereAddr: String,
  imageOrg: { type: Buffer, required: true },
  imageIcon: { type: Buffer, required: true },
  category: { type: Array, required: true }, //array of category id from ToyCategory
  favority: { type: Number, default: 0 }, //0~10 normalize every day
  numOfUse: { type: Number, default: 0 } //0~
});

module.exports = mongoose.model("Toy", toySchema);
