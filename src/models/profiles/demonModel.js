const mongoose = require("mongoose");
const connection = require("../../config/db");

const demonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    views: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    image: {
      type: String,
    },
    class: {
      type: String,
      required: true,
      enum: ["asura", "rakshasa", "daitya", "pisacha", "others"],
    },
    timeline: {
      type: String,
      enum: ["satyayuga", "tretayuga", "dvaparayuga", "kaliyuga"],
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    ancestry: {
      type: String,
    },
    powersAbility: {
      type: String,
    },
    knownWork: {
      type: String,
    },
    region: {
      type: String,
    },
    textualReference: {
      type: String,
    },
    weakness: {
      type: String,
    },
    notes: [
      {
        key: String,
        value: String,
      },
    ],
  },
  { timestamps: true }
);

const Demon = connection.profileConnection.model("Demon", demonSchema);

module.exports = Demon;
