const mongoose = require("mongoose");
const Connection = require("../../config/db");

const hinduFestivalsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    views: { type: Number, default: 0 },
    userId: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: [
        "Solar",
        "Lunar",
        "Seasonal",
        "Mythological",
        "Puranic",
        "Tantric",
        "Others",
      ],
    },
    date: {
      type: String,
    },
    purpose: {
      type: String,
    },
    ritual: {
      type: String,
    },
    deitiesInvolved: {
      type: String,
    },
    references: {
      type: String,
    },

    randomKeyDetails: [
      {
        key: String,
        value: String,
      },
    ],

    notes: [
      {
        key: String,
        value: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = Connection.festivalConnection.model(
  "Festival",
  hinduFestivalsSchema
);
