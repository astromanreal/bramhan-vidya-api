const mongoose = require("mongoose");
const connection = require("../../config/db");

const goddessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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
    domain: {
      type: String,
      enum: [
        "Knowledge",
        "Wealth",
        "Power",
        "Fertility",
        "Love",
        "Justice",
        "Protection",
        "Others",
      ],
    },
    attribute: {
      type: String,
    },
    consort: {
      type: String,
    },
    temple: {
      type: String,
    },
    festival: {
      type: String,
    },
    region: {
      type: String,
    },
    sacredText: {
      type: String,
    },
    iconography: {
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

const Goddess = connection.profileConnection.model("Goddess", goddessSchema);

module.exports = Goddess;
