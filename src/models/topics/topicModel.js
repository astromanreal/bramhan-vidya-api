const mongoose = require("mongoose");
const Connection = require("../../config/db");

const topicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    views: { type: Number, default: 0 },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    randomKeyDetails: [
      {
        key: String,
        value: String,
      },
    ],
    lists: [
      {
        listName: String,
        items: [
          {
            type: String,
          },
        ],
      },
    ],
    likes: {
      count: { type: Number, default: 1 },
      users: [{ type: String }],
    },
    comments: {
      comments: [
        {
          comment: String,
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      count: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const Topic = Connection.topicConnection.model("Topic", topicSchema);

module.exports = Topic;
