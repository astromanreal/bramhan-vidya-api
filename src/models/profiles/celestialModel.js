const mongoose = require("mongoose");
const connection = require("../../config/db");

const celestialSchema = new mongoose.Schema(
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
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    views: { type: Number, default: 0 },
    image: {
      type: String,
    },
    title: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      enum: ["Apsara", "Gandharva", "Yaksha", "Kinnara", "Others"],
    },
    domain: {
      type: String,
      enum: ["Heavenly", "Nature", "Spiritual", "Others"],
    },
    role: {
      type: String,
    },
    description: {
      type: String,
    },
    ability: {
      type: String,
    },
    appearance: {
      type: String,
    },
    reference: {
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

const Celestial = connection.profileConnection.model(
  "Celestial",
  celestialSchema
);

module.exports = Celestial;
