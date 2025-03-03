const mongoose = require("mongoose");
const { appDbConnection } = require("../utils/db");
const { Schema } = mongoose;

const NoteSchema = new Schema(
  {
    title: { type: String },
    text: { type: String },
    user: { type: Schema.Types.ObjectId, require: true, ref: "user" },
  },
  {
    timestamps: true,
  }
);

const NoteModel = appDbConnection.model("note", NoteSchema);

module.exports = NoteModel;
