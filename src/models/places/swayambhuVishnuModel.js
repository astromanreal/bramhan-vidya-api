const mongoose = require("mongoose");
const Connection = require("../../config/db");

const SwayambhuVishnuSchema = new mongoose.Schema(
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
    nearbyPlace: {
      type: String,
    },
    // Additional fields relevant to Swayambhu Vishnu temples
    swayambhuType: {
      type: String,
      enum: ["Self-manifested", "Installed by a sage", "Installed by a king"],
    },
    vishnuForm: {
      type: String,
    },
    associatedLakshmi: {
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

const SwayambhuVishnu = Connection.placeConnection.model(
  "SwayambhuVishnu",
  SwayambhuVishnuSchema
);

module.exports = SwayambhuVishnu;
