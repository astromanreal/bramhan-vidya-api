const mongoose = require("mongoose");
const Connection = require("../../config/db");

const hinduTemplesSchema = new mongoose.Schema(
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
    alternateNames: [
      {
        type: String,
      },
    ],
    location: {
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
      },
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },
    deity: {
      mainDeity: {
        type: String,
      },
      otherDeities: [
        {
          type: String,
        },
      ],
    },
    type: {
      type: String,
      enum: [
        "Shiva",
        "Vaishnava",
        "Shakti",
        "Surya",
        "Ganapati",
        "Hanuman",
        "Mixed",
        "Others",
      ],
    },
    architecture: {
      style: {
        type: String,
      },
      era: {
        type: String,
      },
      features: {
        type: String,
      },
    },
    history: {
      builtBy: {
        type: String,
      },
      builtIn: {
        type: String,
      },
      significantEvent: {
        type: String,
      },
    },
    festivals: {
      type: String,
    },

    timings: {
      openingTime: {
        type: String,
      },
      closingTime: {
        type: String,
      },
    },

    contactInformation: {
      phone: {
        type: String,
      },
      email: {
        type: String,
      },
      website: {
        type: String,
      },
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

    reviews: [
      {
        rating: {
          type: Number,
        },
        comment: {
          type: String,
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = Connection.templeConnection.model(
  "Temple",
  hinduTemplesSchema
);
