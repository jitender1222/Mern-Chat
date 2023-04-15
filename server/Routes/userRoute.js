const express = require("express");
const route = express.Router();
const {
  login,
  registerUser,
  searching,
} = require("../Controller/user-contoller");

route.post("/register", registerUser);
route.post("/login", login);
route.get("/search", searching);

module.exports = route;
