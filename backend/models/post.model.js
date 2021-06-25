const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  profileImage: {
    type: String,
  },

  tags: [
    {
      type: String,
    },
  ],

  comments: [
    {
      description: {
        type: String,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      userName: {
        type: String,
      },
      userImage: {
        type: String,
      },
    },
  ],
  creationDate: {
    type: String,
  },
  votes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
