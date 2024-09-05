const mongoose = require("mongoose");
const connections = require("../../config/db");

const communitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "members",
    },
    // members: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Member",
    //     populate: true,
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = connections.communityConnection.model(
  "Community",
  communitySchema
);
