const mongoose = require("mongoose");
const connection = require("../../config/db");

const godSchema = new mongoose.Schema(
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
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    deityType: {
      type: String,
      enum: ["Major Deity", "Minor Deity", "Avatara", "Others"],
      default: "Major Deity",
    },
    attribute: {
      type: String,
    },
    weapon: {
      type: String,
    },
    mount: {
      type: String,
    },
    symbol: {
      type: String,
    },
    associatedWith: {
      type: String,
    },
    associatedText: {
      type: String,
    },
    iconography: {
      type: String,
    },
    worshippedIn: {
      type: String,
    },
    festival: {
      type: String,
    },
    avatarOf: {
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

const God = connection.profileConnection.model("God", godSchema);

module.exports = God;
