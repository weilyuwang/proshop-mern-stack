// Simple middleware for handling exceptions inside of async express routes
// and passing them to your express error handlers
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc      Auth user & get token
// @route     POST /api/users/login
// @access    Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Search for user in database based on the email
  const user = await User.findOne({ email });

  // Check if user exists and if the password is correct
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc      Register a new user
// @route     POST /api/users
// @access    Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    // If user is created successfully
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc      Get user profile
// @route     GET /api/users/profile
// @access    Private
const getUserProfile = asyncHandler(async (req, res) => {
  // user property is added to req object by the protect auth middleware
  const user = await User.findById(req.user._id);

  if (user) {
    // If user is found, return the user info
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    // Authorization token has been verified, but user is not found
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc      Update user profile
// @route     PUT /api/users/profile
// @access    Private
const updateUserProfile = asyncHandler(async (req, res) => {
  // user property is added to req object by the protect auth middleware
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // Only touch password if its in the req body
    // - to avoid rehashing the users password in database
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    // send the updated user info
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    // Authorization token has been verified, but user is not found
    res.status(404);
    throw new Error("User not found");
  }
});

export { authUser, getUserProfile, registerUser, updateUserProfile };
