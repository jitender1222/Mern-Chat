const Chat = require("../models/chat");
const User = require("../models/user");

// create or fetch one to one chats

exports.createchats = async (req, res) => {
  try {
    const { userId } = req.body;

    console.log("request.id", req.user.id);
    console.log("request._id", req.user._id);
    console.log("userId", userId);

    if (!userId) {
      // console.log(15);
      res.status(401).send({
        message: "User not found",
        success: false,
      });
    }

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
      select: "name avatar email",
    });

    if (chatExist.length > 0) {
      console.log("inside length");
      res.status(200).send(chatExist[0]);
    } else {
      // created a new chat
      console.log("insidde the create chat");
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };
      try {
        const createChat = await Chat.create(chatData);
        // console.log(createChat);

        const sendChat = await Chat.findOne({ _id: createChat._id }).populate(
          "users",
          "-password"
        );

        // console.log("sendChat", sendChat);
        res.status(201).json({
          message: "Chat created successfully",
          success: true,
          sendChat,
        });
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(201).send({
      message: "error while creating a chat",
      success: false,
    });
  }
};

// fetching the chats

exports.fetchChats = async (req, res) => {
  if (!req.user) {
    throw new Error("User not authenticated");
  }
  // console.log("req inside the chat contoller line 80", req.user);
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        console.log(JSON.stringify(results));
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      message: "error while fetching the user",
      success: false,
    });
  }
};

// group Chats

exports.groupChats = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    res.status(401).json({
      message: "All fields are required",
      success: false,
    });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res.status(401).json({
      message: "More then 2 users are required to form a group chat",
      success: false,
    });
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json({
      message: "Groupt Chat created successfully",
      succcess: true,
      fullGroupChat,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.renameGroup = async (req, res) => {
  const { chatId, newName } = req.body;

  const rename = await Chat.findByIdAndUpdate(
    chatId,
    { chatName: newName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!rename) {
    res.status(400).json({
      message: "Group not found with this id",
      succcess: false,
    });
  } else {
    res.send(rename);
  }
};

exports.addUser = async (req, res) => {
  const { userId, groupId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    groupId,
    { $push: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(401);
    throw new Error("User not found");
  } else {
    res.json(added);
  }
};
exports.removeUser = async (req, res) => {
  const { userId, groupId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    groupId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(401);
    throw new Error("User not found");
  } else {
    res.json(added);
  }
};
