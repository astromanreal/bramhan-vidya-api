const mongoose = require("mongoose");
const connection = require("../../config/db");

const shivaAvatarSchema = new mongoose.Schema(
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
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    image: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    attribute: {
      type: String,
    },
    symbolism: {
      type: String,
    },
    associatedDeity: {
      type: String,
    },
    worship: {
      type: String,
    },
    festival: {
      type: String,
    },
    iconography: {
      type: String,
    },
    region: {
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

const ShivaAvatar = connection.profileConnection.model(
  "ShivaAvatar",
  shivaAvatarSchema
);

module.exports = ShivaAvatar;
