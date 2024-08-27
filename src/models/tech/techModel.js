const mongoose = require("mongoose");
const Connection = require("../../config/db");

const technologySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    order: {
      type: Number,
    },
    reference: {
      type: String,
    },
    owner: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    views: { type: Number, default: 0 },
    userId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Armour",
        "Flags",
        "Vehicles",
        "Chakra",
        "Weapons",
        "Trees",
        "Plants",
        "Vessels",
        "Instruments",
        "Substances",
        "Treasures",
        "Jewellery",
        "Garland|Mala",
        "Miscellaneous",
        "Others",
      ],
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

    likes: {
      count: { type: Number, default: 1 },
      users: [{ type: String }],
    },
    comments: {
      comments: [
        {
          comment: String,
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      count: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports = Connection.techConnection.model(
  "Technology",
  technologySchema
);
