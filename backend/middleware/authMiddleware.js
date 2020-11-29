import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  // Check for the token in the request. If the token exists, make sure that it is a Bearer token.
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Split the Bearer token. Where [0] === Bearer, and [1] === token itself.
      token = req.headers.authorization.split(" ")[1];
      // Decode token with the help of JWT_SECRET code.
      // decoded token has {id: "#####"", iat: "####", exp: "####" } user id, issued at, expiration.
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Find the user via decoded.id inside of the decoded token. Moreover, eventhough we are not sending
      // back the users password, we still want to make sure that it is not being send back in any case.
      // Therefore, we set select.("-password").
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    // Not authorized
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
//
