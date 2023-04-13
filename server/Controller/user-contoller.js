const User = require("../models/user");

export const registerUser = (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    if (!name || !email || !password) {
      res.status(401).json({
        message: "All fields are required",
        success: false,
      });
    }
  } catch (error) {}
};
