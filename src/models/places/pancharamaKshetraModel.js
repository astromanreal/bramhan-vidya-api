const mongoose = require("mongoose");
const Connection = require("../../config/db");

const PancharamaKshetraSchema = new mongoose.Schema(
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
    kshetraName: {
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

    // Additional fields relevant to Pancharama Kshetras
    kshetraOrder: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
    associatedLingam: {
      type: String,
    },
    associatedTheertham: {
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

const PancharamaKshetra = Connection.placeConnection.model(
  "PancharamaKshetra",
  PancharamaKshetraSchema
);

module.exports = PancharamaKshetra;
