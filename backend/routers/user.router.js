const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

const privateRoute = require("../middlewears/verifyToken");
router.route("/").get(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    message: "All Users fetched successfully",
    users,
  });
});

router.route("/follow").post(privateRoute, async (req, res) => {
  const { searchedUserId } = req.body;
  try {
    const searchedUser = await User.findById(searchedUserId);
    const loggedInUserId = req.user._id;
    const loggedInUser = await User.findById(loggedInUserId);
    if (loggedInUser.following.includes(searchedUser._id)) {
      loggedInUser.following.remove(searchedUser._id);
      searchedUser.followers.remove(searchedUser._id);
    } else {
      loggedInUser.following.push(searchedUser._id);
      searchedUser.followers.push(searchedUser._id);
    }

    await loggedInUser.save();
    await searchedUser.save();

    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "Followers and following updated successfully",
      users: users,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      successs: false,
      message: "Not able to update followers",
      errorMessage: error.message,
    });
  }
});

module.exports = router;
