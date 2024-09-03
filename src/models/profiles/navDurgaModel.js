const mongoose = require("mongoose");
const connection = require("../../config/db");

const navaDurgaSchema = new mongoose.Schema(
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
    otherNames: {
      type: String,
    },
    day: {
      type: Number,
    },
    attribute: {
      type: String,
    },
    weapons: {
      type: String,
    },
    mount: {
      type: String,
    },
    iconography: {
      type: String,
    },
    symbolism: {
      type: String,
    },
    associatedLegend: {
      type: String,
    },
    mantra: {
      type: String,
    },
    worshipPractice: {
      type: String,
    },
    benefit: {
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

const NavaDurga = connection.profileConnection.model(
  "NavaDurga",
  navaDurgaSchema
);

module.exports = NavaDurga;
