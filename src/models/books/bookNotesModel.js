const mongoose = require("mongoose");
const connections = require("../../config/db");

const bookNotesSchema = new mongoose.Schema(
  {
    bookId: {
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
          // validate: {
          //   validator: function (descriptions) {
          //     return descriptions.length >= 1 && descriptions.length <= 3;
          //   },
          //   message:
          //     "Please provide at least one and no more than three descriptions",
          // },
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

module.exports = connections.bookConnection.model("BookNotes", bookNotesSchema);
