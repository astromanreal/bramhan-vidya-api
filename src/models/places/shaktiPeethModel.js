const mongoose = require("mongoose");
const Connection = require("../../config/db");

const ShaktiPeethSchema = new mongoose.Schema(
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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    image: {
      type: String,
    },
    location: {
      city: String,
      state: String,
      country: String,
      latitude: Number,
      longitude: Number,
    },
    deity: {
      type: String,
    },
    templeName: {
      type: String,
    },
    bodyPart: {
      type: String,
      enum: [
        "Head",
        "Neck",
        "Eyes",
        "Ears",
        "Nose",
        "Mouth",
        "Tongue",
        "Hands",
        "Breasts",
        "Navel",
        "Knees",
        "Toes",
      ],
    },
    significance: {
      type: String,
    },
    legend: {
      type: String,
    },
    images: {
      type: [String],
    },
    description: {
      type: String,
    },
    bestTimeToVisit: {
      type: String,
    },
    visitingHours: {
      type: String,
    },
    offerings: {
      type: String,
    },
    accommodation: {
      type: String,
    },

    nearbyPlaces: {
      type: String,
    },

    // Additional fields relevant to Shakti Peeth
    goddessForm: {
      type: String,
    },
    shaktiPeethType: {
      type: String,
      enum: ["Maha Shakti Peeth", "Shakti Peeth"],
    },
    associatedDeity: {
      type: String,
    },
    festivals: {
      type: [String],
    },

    rituals: {
      type: [String],
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

const ShaktiPeeth = Connection.placeConnection.model(
  "ShaktiPeeth",
  ShaktiPeethSchema
);

module.exports = ShaktiPeeth;
