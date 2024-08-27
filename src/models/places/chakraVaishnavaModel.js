const mongoose = require("mongoose");
const Connection = require("../../config/db");

const ChakraVaishnavaSchema = new mongoose.Schema(
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
      // enum: ["Vishnu"],
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

    // Additional fields relevant to Chakra Vaishnava Temples
    chakra: {
      type: String,
      enum: [
        "Muladhara",
        "Svadhisthana",
        "Manipura",
        "Anahata",
        "Vishuddha",
        "Ajna",
        "Sahasrara",
        "Guru Paduka",
      ],
    },
    associatedChakraColor: {
      type: String,
    },
    associatedChakraDeity: {
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

const ChakraVaishnava = Connection.placeConnection.model(
  "ChakraVaishnava",
  ChakraVaishnavaSchema
);

module.exports = ChakraVaishnava;
