const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Memo = require("../models/memoModel");

//@desc Get all users (limited fields)
//@route GET /api/v1/admin/users
//@access Private (Admin)
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("username email role createdAt");
  res.status(200).json(users);
});

//@desc Get all memos (read-only)
//@route GET /api/v1/admin/memos
//@access Private (Admin)
const getAllMemos = asyncHandler(async (req, res) => {
  const memos = await Memo.find().populate("user_id", "username email");
  res.status(200).json(memos);
});

module.exports = {
  getAllUsers,
  getAllMemos,
};
