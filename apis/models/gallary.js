const mongoose = require("mongoose");

const gallarySchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: mongoose.Schema.Types.String, required: true },
  whereAddr: mongoose.Schema.Types.String,
  imagePath: { type: mongoose.Schema.Types.String, required: true },
  imageIcon: mongoose.Schema.Types.String
  //categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  //categoryName: mongoose.Schema.Types.String,
});

module.exports = mongoose.model("Gallary", gallarySchema);
