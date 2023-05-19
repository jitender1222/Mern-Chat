const Chat = require("../models/chat");
const Message = require("../models/message");
const User = require("../models/user");

exports.sendMessages = async (req, res) => {
  const { message, chatId } = req.body;

  if (!message || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    message: message,
    chat: chatId,
  };

  try {
    var msg = await Message.create(newMessage);
    msg = await msg.populate("sender", "name pic");
    msg = await msg.populate("chat");
    msg = await User.populate(msg, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: msg,
    });

    res.json(msg);
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error(error.message);
  }
};
exports.allMessages = async (req, res) => {
  try {
    const message = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(message);
  } catch (error) {
    console.log("error", error);
  }
};
