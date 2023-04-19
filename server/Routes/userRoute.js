const express = require("express");
const route = express.Router();
const {
  login,
  registerUser,
  searching,
} = require("../Controller/user-contoller");
const { createMessage } = require("../Controller/message-controller");
const { createchats, fetchChats } = require("../Controller/chat-contoller");
const { protect } = require("../middleware/auth");

route.post("/register", registerUser);
route.post("/login", login);
// route.get("/search", searching);

// messages
route.post("/message", createMessage);

// Chats
route.post("/chats", protect, createchats);
route.get("/fetchChats", protect, fetchChats);

module.exports = route;
