const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function protect(req, res, next) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res
          .status(401)
          .json({ message: "Not authorized, token is missing" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res
          .status(401)
          .json({ message: "Not authorized, user not found for token" });
      }

      req.user = user;
      next();
    } catch (err) {
      console.error("Access token verification failed:", err.message);
      return res
        .status(401)
        .json({ message: "Not authorized, access token invalid or expired" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, no token provided" });
  }
}

module.exports = { protect };
