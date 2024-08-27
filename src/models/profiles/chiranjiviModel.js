const mongoose = require("mongoose");
const connection = require("../../config/db");

const chiranjiviSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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
    type: {
      type: String,
      enum: ["sage", "king", "god", "warrior", "others"],
      default: "sage",
    },
    ability: {
      type: String,
    },
    iconography: {
      type: String,
    },
    worshippedIn: {
      type: String,
    },
    festival: {
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

const Chiranjivi = connection.profileConnection.model(
  "Chiranjivi",
  chiranjiviSchema
);

module.exports = Chiranjivi;
