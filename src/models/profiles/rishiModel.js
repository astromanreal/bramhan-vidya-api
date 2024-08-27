const mongoose = require("mongoose");
const connection = require("../../config/db");

const rishiSchema = new mongoose.Schema(
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
    class: {
      type: String,
      required: true,
      enum: [
        "saptarishis",
        "brahmarishis",
        "rajrishis",
        "maharishis",
        "devarishis",
        "paramrishis",
        "kantharishis",
        "others",
      ],
    },
    timeline: {
      type: String,
      enum: ["satyayuga", "tretayuga", "dvaparayuga", "kaliyuga"],
    },
    deity: {
      type: String,
    },
    disciple: {
      type: String,
    },
    ancestry: {
      type: String,
    },
    quality: {
      type: String,
    },
    knownWork: {
      type: String,
    },
    region: {
      type: String,
    },
    children: {
      type: String,
    },
    placesOfWorship: {
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

const Rishi = connection.profileConnection.model("Rishi", rishiSchema);

module.exports = Rishi;
