const mongoose = require("mongoose");

let Image = "";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
    minLength: 4,
  },
  email: {
    type: String,
    required: [true, "please provide an email"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide a passwor"],
    trim: true,
    minLength: 8,
  },
  bio: {
    type: String,
    default: "Hello there",
    minLength: 2,
    maxLength: 250,
  },
  avatar: {
    type: String,
    default: Image,
  },
});

const user = mongoose.model("user", userSchema);

export default user;
