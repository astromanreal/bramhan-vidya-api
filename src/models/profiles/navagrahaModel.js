const mongoose = require("mongoose");
const connection = require("../../config/db");

const navagrahaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    views: { type: Number, default: 0 },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    celestialBody: {
      type: String,
    },
    otherName: {
      type: String,
    },
    weapon: {
      type: String,
    },
    mantra: {
      type: [String],
    },
    gemstone: {
      type: String,
    },
    color: {
      type: String,
    },
    day: {
      type: String,
    },
    mount: {
      type: String,
    },
    festival: {
      type: String,
    },
    temple: {
      type: String,
    },
    mother: {
      type: String,
    },
    father: {
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

const Navagraha = connection.profileConnection.model(
  "Navagraha",
  navagrahaSchema
);

module.exports = Navagraha;
