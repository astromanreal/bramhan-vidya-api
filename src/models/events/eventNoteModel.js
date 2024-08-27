const mongoose = require("mongoose");
const connections = require("../../config/db");

const eventNotesSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book ID is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User ID is required"],
    },
    notes: {
      title: { type: String, required: [true, "Title is required"] },
      description: [
        {
          type: String,
        },
      ],
      likes: {
        count: { type: Number, default: 1 },
        users: [{ type: String }],
      },
      comments: [
        {
          comment: String,
          userId: String,
          createdAt: { type: Date, default: Date.now },
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = connections.eventConnection.model(
  "EventNotes",
  eventNotesSchema
);
