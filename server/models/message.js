const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    message: {
      type: String,
      trim: true,
    },
    chat: {
      type: mongoose.Types.ObjectId,
      ref: "chat",
    },
  },
  {
    timestamps: true,
  }
);

const message = mongoose.model("message", messageSchema);

module.exports = message;
