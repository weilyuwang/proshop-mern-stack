import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// Authentication Middleware - for protected/private routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // trip 'Bearer' and get the token
      token = req.headers.authorization.split(" ")[1];
      // Decode the token - retrieve the user Id embedded in the token payload
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // select(): Specifies which document fields to include or exclude
      // select('-password'): Do not include password field in the returned User object
      // Then add user property to the req object
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (err) {
      res.status(401);
      throw new Error("Not Authorized, Token Invalid");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, No Token");
  }
});

export { protect };
