const mongoose = require("mongoose");
const Connection = require("../../config/db");

const PanchKedarSchema = new mongoose.Schema(
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
      // enum: ["Shiva"],
    },
    templeName: {
      type: String,
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

    // Additional fields relevant to Panch Kedar
    kedarOrder: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
    associatedPandava: {
      type: String,
      enum: ["Dharmaraja", "Bhima", "Arjuna", "Nakula", "Sahadeva"],
    },
    associatedShivaForm: {
      type: String,
    },
    festivals: {
      type: String,
    },

    rituals: {
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

const PanchKedar = Connection.placeConnection.model(
  "PanchKedar",
  PanchKedarSchema
);

module.exports = PanchKedar;
