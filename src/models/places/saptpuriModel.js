const mongoose = require("mongoose");
const Connection = require("../../config/db");

const SaptpuriSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    views: { type: Number, default: 0 },
    path: {
      type: String,
      required: true,
    },
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
      type: [String],
    },

    // Additional fields relevant to Saptpuri
    mokshaImportance: {
      type: String,
    },
    liberationStory: {
      type: String,
    },
    templeHistory: {
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

const Saptpuri = Connection.placeConnection.model("Saptpuri", SaptpuriSchema);

module.exports = Saptpuri;
