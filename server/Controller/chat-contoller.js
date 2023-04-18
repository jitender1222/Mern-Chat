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

    console.log("request", req.user._id);
    console.log("userId", userId);

    // if chat is one to one
    var chatExist = await Chat.find({
      isGroupChat: false,
      userId,

      $and: [
        { users: { $elemMatch: { $eq: req.userId } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    console.log("success");
    console.log("chatExist", chatExist);
    chatExist = await User.populate(chatExist, {
      path: "latestMessage.sender",
      select: "name avatar email _id",
    });
    console.log("failed", chatExist);
    if (chatExist.length > 0) {
      res.status(200).send(chatExist[0]);
    } else {
      // created a new chat
      const createChat = await Chat.create({
        chatName: "sender",
        isGroupChat: false,
        users: [req.user.id, userId],
      });

      const sendChat = await Chat.findOne({ _id: createChat._id }).populate(
        "users",
        "-password"
      );

      res.status(201).json({
        message: "Chat created successfully",
        success: true,
        sendChat,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(201).send({
      message: "error while creating a chat",
      success: false,
    });
  }
};
