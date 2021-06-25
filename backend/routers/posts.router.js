const express = require("express");
const router = express.Router();
const privateRoute = require("../middlewears/verifyToken");
const User = require("../models/user.model");
const Post = require("../models/post.model");
const { extend } = require("lodash");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const posts = await Post.find();
      res.status(200).json({
        success: true,
        message: "Post Fetched Successfully",
        posts: posts,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error occured while getting posts",
      });
    }
  })
  .post(privateRoute, async (req, res) => {
    try {
      const userId = req.user._id;

      let user = await User.findById(userId);

      const { title, description, tags } = req.body;

      const newPost = new Post({
        userId: user._id,
        title: title,
        description: description,
        profileImage: user.profileImage,
        tags: tags,
        comments: [],
        votes: [],
      });
      await newPost.save();

      const posts = await Post.find();
      res.json({
        success: true,
        message: "Post successfully added to the database",
        updatedPosts: posts,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Post was not added to database",
        errorMessage: error.message,
      });
    }
  });

router.param("postId", async (req, res, next, id) => {
  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(400).json({
        success: false,
        message: "post not found",
      });
    }
    req.post = post;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router
  .route("/:postId")
  .post(privateRoute, async (req, res) => {
    try {
      const { title, description, tags } = req.body;
      const postId = req.post._id;

      let editPost = await Post.findById(postId);
      editPost = extend(editPost, {
        title: title,
        description: description,
        tags: tags,
      });
      await editPost.save();
      const Allposts = await Post.find();
      res.status(200).json({
        success: true,
        message: "Post successfully updated in the database",
        posts: Allposts,
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Post was not updated in the database",
        errorMessage: error.message,
      });
    }
  })
  .delete(privateRoute, async (req, res) => {
    try {
      const postId = req.post._id;

      await Post.remove({ _id: postId });
      const Allposts = await Post.find();
      res.status(200).json({
        success: true,
        message: "Post successfully deleted from the database",
        posts: Allposts,
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Post was not deleted from the database",
        errorMessage: error.message,
      });
    }
  });

router.route("/:postId/like").post(privateRoute, async (req, res) => {
  try {
    const userId = req.user._id;
    const post = req.post;

    if (post.votes.includes(userId)) {
      post.votes.remove(userId);
    } else {
      post.votes.push(userId);
    }
    await post.save();
    const Allposts = await Post.find();
    res.status(200).json({
      success: true,
      message: "Votes in post successfully updated in the database",
      posts: Allposts,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Votes in post was not updated in the database",
      errorMessage: error.message,
    });
  }
});

router.route("/:postId/comment").post(privateRoute, async (req, res) => {
  try {
    const { description } = req.body;
    const loggedInUserId = req.user._id;

    const loggedInUser = await User.findById(loggedInUserId);

    const post = req.post;
    const newComment = {
      description,
      userId: loggedInUser._id,
      userName: loggedInUser.name,
      userImage: loggedInUser.profileImage,
    };
    post.comments.push(newComment);

    await post.save();
    const Allposts = await Post.find();
    res.status(200).json({
      success: true,
      message: "Comment in post successfully updated in the database",
      posts: Allposts,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Comment in post was not updated in the database",
      errorMessage: error.message,
    });
  }
});
module.exports = router;
