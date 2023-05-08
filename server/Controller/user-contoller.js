const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// for registering the user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    if (!name || !email || !password) {
      res.status(401).send({
        message: "All fields are required",
        success: false,
      });
    }

    // if user exist or not
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res.status(401).send({
        message: "User already exist with this email",
        success: false,
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

    const token = jwt.sign(
      {
        userId: newuser._id,
      },
      "JWT_SECRET",
      { expiresIn: "45d" }
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      _id: newuser._id,
      newuser,
      token,
    });
    console.log("token iside the register", token);
  } catch (error) {
    console.log(error);
    res.status(401).send({
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
      res.status(401).send({
        success: false,
        message: "All fields required",
      });
    }

    // userExist

    const userExist = await User.findOne({ email });

    if (!userExist) {
      res.status(401).send({
        message: "User not found check the email",
        success: false,
      });
    }

    // password validation if user found

    const compPassword = await bcrypt.compare(password, userExist.password);

    if (!compPassword) {
      res.status(401).send({
        message: "Password incorrect",
        success: false,
      });
    }

    const token = jwt.sign(
      { userId: userExist._id, name: userExist.name, email: userExist.email },
      "JWT_SECRET",
      { expiresIn: "30d" }
    );
    console.log("token iside the login", token);

    res.status(200).send({
      message: "User login Successfully",
      success: true,
      _id: userExist._id,
      userExist,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "error while creating a user",
      success: false,
    });
  }
};

//searching the user

exports.searching = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(keyword);
    res.send(users);
  } catch (error) {
    console.log(error);
  }
};
