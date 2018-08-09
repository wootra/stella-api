const mongoose = require("mongoose");

const newsSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: mongoose.Schema.Types.String, required: true },
    date: { type: mongoose.Schema.Types.Date, required: true },
    content: { type: mongoose.Schema.Types.String, required: true },
    writer: { type: mongoose.Schema.Types.String, required: true },
    writerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    modified: mongoose.Schema.Types.Date,
    important: mongoose.Schema.Types.Boolean,
    idx: { type: mongoose.SchemaTypes.Number, index: true }
  },
  { autoIndex: true }
);

module.exports = mongoose.model("News", newsSchema);
