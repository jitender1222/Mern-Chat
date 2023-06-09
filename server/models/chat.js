const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    latestMessage: {
      type: mongoose.Types.ObjectId,
      ref: "message",
    },
    groupAdmin: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const chat = mongoose.model("chat", chatSchema);

module.exports = chat;
