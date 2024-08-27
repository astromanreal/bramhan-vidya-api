const mongoose = require("mongoose");
const connection = require("../../config/db");

const mahavidyaSchema = new mongoose.Schema(
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
    attribute: {
      type: String,
    },
    iconography: {
      type: String,
    },
    symbolism: {
      type: String,
    },
    associatedDeitie: {
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
    festival: {
      type: String,
    },
    region: {
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

const Mahavidya = connection.profileConnection.model(
  "Mahavidya",
  mahavidyaSchema
);

module.exports = Mahavidya;
