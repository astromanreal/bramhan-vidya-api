const mongoose = require("mongoose");
const connection = require("../../config/db");

const vanaraSchema = new mongoose.Schema(
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
    iconography: {
      type: String,
    },
    roleInRamayana: {
      type: String,
    },
    ability: {
      type: String,
    },
    region: {
      type: String,
    },
    symbolism: {
      type: String,
    },
    worship: {
      type: String,
    },
    text: {
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

const Vanara = connection.profileConnection.model("Vanara", vanaraSchema);

module.exports = Vanara;
