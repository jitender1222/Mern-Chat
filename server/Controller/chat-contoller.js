const Chat = require("../models/chat");
const User = require("../models/user");

exports.createchats = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      res.status(401).send({
        message: "User not found",
        success: false,
      });
    }

    console.log("userId", userId);
    console.log("request", req.user._id);

    // if chat is one to one
    var chatExist = await Chat.find({
      isGroupChat: false,

      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    chatExist = await User.populate(chatExist, {
      path: "latestMessage.sender",
      select: "name avatar email _id",
    });

    if (chatExist.length > 0) {
      res.send(chatExist[0]);
    } else {
      // created a new chat
      const createChat = await Chat.create({
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      });

      const sendChat = await Chat.findOne({ id: createChat.id }).populate(
        "users",
        "-password"
      );

      res.status(201).send(sendChat);
    }
  } catch (error) {
    console.log(error);
    res.status(201).send({
      message: "error while creating a chat",
      success: false,
    });
  }
};
