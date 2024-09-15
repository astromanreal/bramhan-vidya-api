const mongoose = require("mongoose");
const Connection = require("../../config/db");

const hinduOrganisationsSchema = new mongoose.Schema(
  {
    organisationName: {
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
        "Political",
        "Social",
        "Religious",
        "Cultural",
        "Educational",
        "Charitable",
        "Others",
      ],
    },
    foundingYear: {
      type: String,
    },
    founder: {
      type: String,
    },
    headquarter: {
      type: String,
    },
    objective: {
      type: String,
    },

    contactInformation: {
      website: {
        type: String,
      },
      phone: {
        type: String,
      },
      email: {
        type: String,
      },
      address: {
        type: String,
      },
    },
    notableFigures: {
      type: String,
    },
    controversies: {
      type: String,
    },
    achievements: {
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

module.exports = Connection.organisationConnection.model(
  "Organisation",
  hinduOrganisationsSchema
);
