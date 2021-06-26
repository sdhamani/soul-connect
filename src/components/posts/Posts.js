import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./posts.css";

import {
  addComment,
  likePostFun,
  sortBy,
  updatePosts,
} from "../../actions/posts-action";
import { commentPost, likePost } from "../../api/post-api";

function Posts() {
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const allUsers = useSelector((state) => state.allUsers);
  let posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  posts = posts.slice().sort(function (a, b) {
    a = new Date(a.creationDate);
    b = new Date(b.creationDate);

    return b - a;
  });

  const updateLike = (ideaId, loggedInUserId) => {
    dispatch(likePostFun(ideaId, loggedInUserId));
    likePost(loggedInUser.token, ideaId);
  };

  const handleKeyPress = (e, id) => {
    if (e.key === "Enter") {
      dispatch(
        addComment(
          e.target.value,
          id,
          loggedInUser.userName,
          loggedInUser.userImage
        )
      );
      commentPost(loggedInUser.token, id, e.target.value);
      e.target.value = "";
    }
  };

  useEffect(() => {
    dispatch(updatePosts());
  }, [dispatch]);

  return (
    <div className="all-posts">
      <div className="posts-sortby">
        <label>SortBy:</label>

        <select defaultValue onChange={(e) => dispatch(sortBy(e.target.value))}>
          <option defaultValue hidden value="select">
            {" "}
            select an option
          </option>
          <option value="VOTES">High Votes</option>
          <option value="EARLIEST_DATE">Creation Date: Earliest</option>
          <option value="OLDEST_DATE">Creation Date: Oldest</option>
        </select>
      </div>
      <div>
        {posts?.map((idea) => {
          let user = allUsers.find((user) => user._id === idea.userId);

          let date = new Date(idea.creationDate);

          date =
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear();

          return (
            <div key={idea._id} className="idea">
              <div className="idea-heading">
                {" "}
                <img
                  className="createPost-userImage"
                  alt="userImage"
                  src={loggedInUser.userImage}
                ></img>
                <div>
                  <div>{user?.name}</div>
                  <div className="idea-date">{date}</div>
                </div>
              </div>
              <div className="idea-heading-title">{idea.title}</div>
              <div className="idea-description">{idea.description}</div>
              <div className="added-tags-posts">
                {idea.tags.map((tag) => (
                  <span key={tag} className="idea-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <hr></hr>
              <div>
                <i
                  className={
                    idea.votes.includes(loggedInUser?.userId)
                      ? "fa fa-arrow-up liked"
                      : "fa fa-arrow-up"
                  }
                  onClick={(e) => updateLike(idea._id, loggedInUser.userId)}
                  aria-hidden="true"
                ></i>
                <span>{idea.votes.length}</span>
              </div>
              <div className="create-comment">
                <img
                  className="createPost-userImage"
                  src={loggedInUser.userImage}
                  alt="user"
                />
                <input
                  onKeyPress={(e) => handleKeyPress(e, idea._id)}
                  className="create-comment-input"
                  type="text"
                  placeholder="Add a comment..,"
                />
              </div>
              <div className="comments">
                {idea.comments?.map((comment, index) => {
                  return (
                    <div key={index} className="comment">
                      <img
                        className="createPost-userImage comment-user-image"
                        src={comment.userImage}
                        alt="user"
                      />
                      <div className="comment-text">
                        <h6>{comment.userName}</h6>
                        <p className="comment-desc">{comment.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Posts;
