const mongoose = require("mongoose");
const connection = require("../../config/db");

const creatureSchema = new mongoose.Schema(
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
    type: {
      type: String,
      enum: ["Vahana", "Animal", "Bird", "Serpent", "Other"],
      required: true,
    },
    description: {
      type: String,
    },
    associatedDeity: {
      type: String,
    },
    description: {
      type: String,
    },
    iconography: {
      type: String,
    },
    symbolicMeaning: {
      type: String,
    },
    mythologyReferences: {
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

const Creature = connection.profileConnection.model("Creature", creatureSchema);

module.exports = Creature;
