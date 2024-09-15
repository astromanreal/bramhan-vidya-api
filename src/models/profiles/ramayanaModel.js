const mongoose = require("mongoose");
const connection = require("../../config/db");

const ramayanaSchema = new mongoose.Schema(
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
    role: {
      type: String,
      enum: [
        "Prince",
        "King",
        "Sage",
        "Demon",
        "Vanara",
        "Ram Family",
        "Ravan Family",
        "Others",
      ],
    },
    family: {
      mother: { type: String },
      father: { type: String },
      spouse: { type: String },
      children: { type: String },
    },
    skill: {
      type: String,
    },
    attribute: {
      type: String,
    },
    symbolism: {
      type: String,
    },
    associatedCharacter: {
      type: String,
    },
    iconography: {
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

const Ramayana = connection.profileConnection.model("Ramayana", ramayanaSchema);

module.exports = Ramayana;
