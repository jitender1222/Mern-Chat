const express = require("express");
const route = express.Router();
const {
  login,
  registerUser,
  searching,
} = require("../Controller/user-contoller");
const { createMessage } = require("../Controller/message-controller");
const {
  createchats,
  fetchChats,
  groupChats,
  renameGroup,
  addUser,
  removeUser,
} = require("../Controller/chat-contoller");
const { protect } = require("../middleware/auth");

route.post("/register", registerUser);
route.post("/login", protect, login);
route.get("/", protect, searching);

// messages
route.post("/message", createMessage);
// Chats
route.post("/chats", protect, createchats);
route.get("/fetchChats", protect, fetchChats);
route.post("/group", protect, groupChats);
route.put("/rename", protect, renameGroup);
route.put("/addUser", protect, addUser);
route.post("/removeUser", protect, removeUser);

module.exports = route;
