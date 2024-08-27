const mongoose = require("mongoose");
const connections = require("../../config/db");

const communityMemberSchema = new mongoose.Schema(
  {
    communityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    role: {
      type: String,
      enum: ["admin", "member", "bot"],
    },
  },
  { timestamps: true }
);

module.exports = connections.communityConnection.model(
  "Member",
  communityMemberSchema
);
