const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("token", token);
      // decode the token
      const decode = jwt.verify(token, "JWT_SECRET");
      console.log("decode", decode);

      // req.user = await User.findById(decode.id).select("-password");
      req.user = await User.findById(decode.id).select("-password");
      // req.user = { id: decode.userId };
      console.log(req.user);

      next();
    } catch (error) {
      console.log(error);
    }
  }

  if (!token) {
    res.status(400);
    throw new Error("Not Authorized, no token");
  }
};
