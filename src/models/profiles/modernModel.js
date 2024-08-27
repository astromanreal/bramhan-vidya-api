const mongoose = require("mongoose");
const connection = require("../../config/db");

const modernSchema = new mongoose.Schema(
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
    teaching: {
      type: String,
    },
    notableWork: {
      type: String,
    },
    region: {
      type: String,
    },
    organization: {
      type: String,
    },
    disciple: {
      type: String,
    },
    significantEvent: {
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

const Modern = connection.profileConnection.model("Modern", modernSchema);

module.exports = Modern;
