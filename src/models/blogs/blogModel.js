const mongoose = require("mongoose");
const Connections = require("../../config/db");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  views: { type: Number, default: 1 },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  keyDetails: [
    {
      key: String,
      value: String,
    },
  ],
  content: [
    {
      key: String,
      value: String,
    },
  ],
  category: {
    type: String,
    enum: [
      "Scriptures",
      "Deities",
      "Festivals",
      "Events",
      "Places",
      "Philosophy",
      "Other",
    ],
  },

  tags: [
    {
      type: String,
    },
  ],
  image: {
    type: String,
  },
});

module.exports = Connections.blogConnection.model("Blog", blogSchema);
