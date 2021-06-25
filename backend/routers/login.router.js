const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

router.route("/").post(async (req, res) => {
  const { name, email, uid, profileImage } = req.body;
  const user = await User.findOne({ uid: uid });

  try {
    if (user) {
      const userId = user._id;
      const userName = user.name;
      const token = jwt.sign({ _id: userId }, process.env.tokenSecret);
      res.status(200).header("auth-token", token).json({
        success: true,
        userid: userId,
        token: token,
        userName: userName,
        profileImage: profileImage,
      });
    } else {
      console.log("in else");
      const NewUser = new User({
        uid,
        name,
        email,
        profileImage,
        likedVideos: [],
        following: [],
        followers: [],
        ideasPosted: [],
      });

      const savedUser = await NewUser.save();

      const userId = savedUser._id;
      const userName = savedUser.name;

      const token = jwt.sign({ _id: userId }, process.env.tokenSecret);

      res.status(200).header("auth-token", token).json({
        success: true,
        userid: userId,
        token: token,
        userName: userName,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      successs: false,
      message: "Not able to add User",
      errorMessage: error.message,
    });
  }
});

module.exports = router;
