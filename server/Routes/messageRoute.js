const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/auth");
const { sendMessages, allMessages } = require("../Controller/messageContoller");

router.post("/", protect, sendMessages);
router.get("/:chatId", protect, allMessages);

module.exports = router;
