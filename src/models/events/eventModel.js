const mongoose = require("mongoose");
const Connection = require("../../config/db");

const eventsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    order: {
      type: Number,
    },
    reference: {
      type: String,
    },
    views: { type: Number, default: 0 },
    userId: {
      type: String,
      required: true,
    },
    randomKeyDetails: [
      {
        key: String,
        value: String,
      },
    ],
    category: {
      type: String,
      enum: [
        "Divine Interventions",
        "Cosmic Events",
        "Royal Coronations",
        "Legendary Quests",
        "Spiritual Awakenings",
        "Mythical Creatures",
        "Ancient Innovations",
        "Philosophical Debates",
        "Festivals of Light",
        "Celestial Alignments",
        "Sacred Pilgrimages",
        "Hidden Treasures",
        "Forgotten Knowledges",
        "Mystical Union",
        "Cosmic Dance",
        "Eternal Love Stories",
        "Timeless Wisdom",
        "Miscellaneous",
        "Others",
      ],
    },

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

module.exports = Connection.eventConnection.model("Event", eventsSchema);
