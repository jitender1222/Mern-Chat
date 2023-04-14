const express = require("express");
const { registerUser } = require("../Controller/user-contoller");

const router = express.Router();

router.post("/register", registerUser);

module.exports = router;
