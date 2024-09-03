const mongoose = require("mongoose");
const connections = require("../../config/db");

const chapterSchema = new mongoose.Schema({
  chapterId: Number,
  title: String,
  verses: [
    {
      verseId: Number,
      text: String,
    },
  ],
});

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    views: { type: Number, default: 0 },
    image: { type: String },
    category: String,
    description: {
      type: String,
    },
    subcategory: String,
    googleBookSrc: {
      type: String,
    },
    type: String,
    author: String,
    language: String,
    tags: [String],
    chapters: [chapterSchema],
    keyDetails: [
      {
        key: String,
        value: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = connections.bookConnection.model("Book", bookSchema);
