import React from "react";

import { useDispatch, useSelector } from "react-redux";
import "./posts.css";
import users from "../../data/users";
import { addComment, likePost, sortBy } from "../../actions/posts-action";

function Posts() {
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

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
      e.target.value = "";
    }
  };

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
        {posts.map((idea) => {
          let user = users.find((user) => user.id === idea.userId);
          return (
            <div key={idea.id} className="idea">
              <div className="idea-heading">
                {" "}
                <img
                  className="createPost-userImage"
                  alt="userImage"
                  src={loggedInUser.userImage}
                ></img>
                <div>
                  <div>{user?.name}</div>
                  <div className="idea-date">{idea.creationDate}</div>
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
                    idea.votes.includes(loggedInUser?.id)
                      ? "fa fa-arrow-up liked"
                      : "fa fa-arrow-up"
                  }
                  onClick={(e) => dispatch(likePost(idea.id, loggedInUser.id))}
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
                  onKeyPress={(e) => handleKeyPress(e, idea.id)}
                  className="create-comment-input"
                  type="text"
                  placeholder="Add a comment..,"
                />
              </div>
              <div className="comments">
                {idea.comments?.map((comment) => {
                  return (
                    <div key={comment.userName} className="comment">
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
