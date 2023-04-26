const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  let token;
  if (
    // req.headers.authorization &&
    req.headers.authorization?.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // decode the token
      const decode = jwt.verify(token, "JWT_SECRET");

      req.user = await User.findById(decode.userId).select("-password");
      // req.user = { id: decode.userId };
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
