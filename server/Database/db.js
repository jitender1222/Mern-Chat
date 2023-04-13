const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://jeetusinghkanyal:sujeet2212@cluster0.oolscpr.mongodb.net/test"
    );
    console.log("database connected successfully");
  } catch (error) {
    console.log(`error ${error} while connecting to the databsee`);
  }
};

module.exports = connect;
