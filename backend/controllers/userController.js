// Middleware for handling exceptions inside of async express routes, passing them to you or to your error handlers(simplification for try and catch method)
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// @desc   Authenticate the user & get token
// @route  POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Find user via email.
  const user = await User.findOne({ email });
  // Match user with the encrypted password for that particular user.
  // matchPassword method comes from the userModel.js
  // Basically, it is going to try to match entered password with the encrypted one in the DB.
  if (user && (await user.matchPassword(password))) {
    // return user info if user was found.
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // generate token as the payload for that particular user
      token: generateToken(user._id),
    });
  } else {
    // Unauthorized user
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc   Register a new user
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // Find user via email.
  const userExists = await User.findOne({ email });

  if (userExists) {
    // Bad request
    res.status(400);
    throw new Error("User already exists");
  }
  // If user does not exists, create one.
  const user = await User.create({
    name,
    email,
    password,
  });
  // if user is successfully created
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // generate token as the payload for that newly created user
      token: generateToken(user._id),
    });
  } else {
    // Bad request.
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc   Get user profile
// @route  Get /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  // req.user._id === curent logged in user
  const user = await User.findById(req.user._id);

  if (user) {
    // Return user
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc   Update user profile
// @route  PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  // req.user._id === curent logged in user
  const user = await User.findById(req.user._id);

  if (user) {
    // Change the name to the one in req.body.name, or if nothing in there, remain as it is.
    user.name = req.body.name || user.name;
    // Same for the email
    user.email = req.body.email || user.email;
    // For the password we first want to see if password was sent or not.
    // If it was sent, change it to whatever was sent.
    if (req.body.password) {
      // It will be encrypted automatically, because of what we did in the ../models/userModel.js
      // Middleware userSchema.pre ...
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    // return updatedUser info if it was updated.
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      // generate token as the payload for that particular updatedUser
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc   Get all users
// @route  GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  // We are passing an empty object because we want to get all users.
  const users = await User.find({});
  res.json(users);
});

// @desc   Delete user
// @route  DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  // Finding a certain user by id.
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc   Get user by ID
// @route  GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  // Grab all info via ID, except for the password.
  const user = await await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc   Update user
// @route  PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  // Find user via id.
  const user = await User.findById(req.params.id);

  if (user) {
    // Change the name to the one in req.body.name, or if nothing in there, remain as it is.
    user.name = req.body.name || user.name;
    // Same for the email.
    user.email = req.body.email || user.email;
    // Change the name to the one in req.body.name
    // (We do not set ||, because it will not work with the false boolean).
    user.isAdmin = req.body.isAdmin;
    const updatedUser = await user.save();

    // return updatedUser info if it was updated.
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
