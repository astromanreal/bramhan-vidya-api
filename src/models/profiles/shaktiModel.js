const mongoose = require("mongoose");
const connection = require("../../config/db");

const shaktiSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Shakti",
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
    attribute: {
      type: String,
    },
    weapon: {
      type: String,
    },
    temple: {
      type: String,
    },
    festival: {
      type: String,
    },
    iconography: {
      type: String,
    },
    region: {
      type: String,
    },
    sacredText: {
      type: String,
    },
    consort: {
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

const Shakti = connection.profileConnection.model("Shakti", shaktiSchema);

module.exports = Shakti;
