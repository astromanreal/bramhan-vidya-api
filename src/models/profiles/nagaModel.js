const mongoose = require("mongoose");
const connection = require("../../config/db");

const nagaSchema = new mongoose.Schema(
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
    timeline: {
      type: String,
      enum: ["Satyayuga", "Tretayuga", "Dvaparayuga", "Kaliyuga"],
    },
    deity: {
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
    event: {
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

const Naga = connection.profileConnection.model("Naga", nagaSchema);

module.exports = Naga;
