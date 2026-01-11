const asyncHandler = require("express-async-handler");
const Memo = require("../models/memoModel");

//@desc Get all memos for logged-in user
//@route GET /api/memos
//@access private
const getMemos = asyncHandler(async (req, res) => {
  const memos = await Memo.find({ user_id: req.user.id });
  res.status(200).json(memos);
});

//@desc Create new memo
//@route POST /api/memos
//@access private
const createMemo = asyncHandler(async (req, res) => {
  const { content } = req.body;

  if (!content) {
    res.status(400);
    throw new Error("Memo content is required");
  }

  const memo = await Memo.create({
    content,
    user_id: req.user.id,
  });

  res.status(201).json(memo);
});

//@desc Get single memo
//@route GET /api/memos/:id
//@access private
const getMemo = asyncHandler(async (req, res) => {
  const memo = await Memo.findById(req.params.id);

  if (!memo) {
    res.status(404);
    throw new Error("Memo not found");
  }

  if (memo.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to access this memo");
  }

  res.status(200).json(memo);
});

//@desc Update memo
//@route PUT /api/memos/:id
//@access private
const updateMemo = asyncHandler(async (req, res) => {
  const memo = await Memo.findById(req.params.id);

  if (!memo) {
    res.status(404);
    throw new Error("Memo not found");
  }

  if (memo.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to update this memo");
  }

  const updatedMemo = await Memo.findByIdAndUpdate(
    req.params.id,
    { content: req.body.content },
    { new: true }
  );

  res.status(200).json(updatedMemo);
});

//@desc Delete memo
//@route DELETE /api/memos/:id
//@access private
const deleteMemo = asyncHandler(async (req, res) => {
  const memo = await Memo.findById(req.params.id);

  if (!memo) {
    res.status(404);
    throw new Error("Memo not found");
  }

  if (memo.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to delete this memo");
  }

  await memo.deleteOne();
  res.status(200).json({ message: "Memo deleted successfully" });
});

module.exports = {
  getMemos,
  createMemo,
  getMemo,
  updateMemo,
  deleteMemo,
};
