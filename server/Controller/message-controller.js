const User = require("../models/user");
const Message = require("../models/message");

exports.createMessage = async (req, res) => {
  try {
    const { message, chatId } = req.body;

    if (!message || !chatId) {
      res.status(401).send({
        message: "All fields are required",
        success: false,
      });
    }

    // create a new message
    const newMessage = {
      sender: User.id,
      message: message,
      chat: chatId,
    };

    let createMsg = await Message.create(newMessage);
    console.log(createMsg);
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "error while creating a message",
      success: false,
    });
  }
};
