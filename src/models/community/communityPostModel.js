const mongoose = require("mongoose");
const connections = require("../../config/db");

const postSchema = new mongoose.Schema(
  {
    communityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = connections.communityConnection.model("Post", postSchema);
