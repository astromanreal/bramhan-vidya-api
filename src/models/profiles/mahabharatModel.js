const mongoose = require("mongoose");
const connection = require("../../config/db");

const mahabharataSchema = new mongoose.Schema(
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
      enum: ["Warrior", "King", "Sage", "Guru", "Others"],
    },
    house: {
      type: String,
      enum: ["Kaurava", "Pandava", "Others", "No one"],
    },
    family: {
      type: String,
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
    festival: {
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

const Mahabharata = connection.profileConnection.model(
  "Mahabharata",
  mahabharataSchema
);

module.exports = Mahabharata;
