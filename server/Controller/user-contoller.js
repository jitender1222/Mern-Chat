const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// for registering the user

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    if (!name || !email || !password) {
      res.status(401).json({
        message: "All fields are required",
        success: false,
      });
    }

    // if user exist or not
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res.status(200).json({
        message: "User found successfully",
        success: true,
      });
    }

    // hash password

    const hashPass = await bcrypt.hash(password, 10);

    const newuser = await User.create({
      name,
      email,
      password: hashPass,
      avatar,
    });

    const token = jwt.sign({
      name: newuser.name,
      email: newuser.email,
      avatar: newuser.avatar,
      token,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      newuser,
    });
  } catch (error) {
    res.status(401).json({
      message: "Error while registering the user",
      success: false,
      error: error,
    });
  }
};

// for login the user

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).json({
        success: false,
        message: "All fields required",
      });
    }

    // userExist

    const userExist = await User.findOne({ email });

    if (!userExist) {
      res.status(401).json({
        message: "User not found check the email",
        success: false,
      });
    }

    // password validation if user found

    const compPassword = await bcrypt.compare(password, userExist.password);

    if (!compPassword) {
      res.status(401).json({
        message: "Password incorrect",
        success: false,
      });
    }

    const token = jwt.sign(
      { name: userExist.name, email: userExist.email },
      "JWT_SECRET",
      { expiresIn: "2d" }
    );

    res.status(401).json({
      message: "User login Successfully",
      success: false,
      userExist,
      token,
    });
  } catch (error) {}

  //searching the user

  exports.searching = async (req, res) => {
    const { search } = req.query;

    const user = await User.find({
      username: { $regex: search, $options: "i" },
    }).select("username avatar _id email bio");

    res.status(201).json({
      message: "user found",
      success: true,
      user,
    });
  };
};
