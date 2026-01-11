const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Register new user
//@route POST /api/users/signup
//@access public
const signupUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role: role === "admin" ? "admin" : "user", // safe default
  });

  res.status(201).json({
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  });
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is incorrect");
  }
});

//@desc Get current logged-in user
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select(
    "username email role createdAt"
  );

  res.status(200).json(user);
});

module.exports = {
  signupUser,
  loginUser,
  currentUser,
};
