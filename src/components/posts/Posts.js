import React, { useState } from "react";
import useLogin from "../../context/login-context";
import firebase from "@firebase/app";
import "./posts.css";
import users from "../../data/users";
import useIdeas from "../../context/ideas-context";

function Posts() {
  const { ideas, ideasDispatch } = useIdeas();
  const { userName, userImage } = useLogin();

  const loggedInUser = users.find((user) => user.employeeId);

  const handleKeyPress = (e, id) => {
    if (e.key === "Enter") {
      ideasDispatch({
        TYPE: "ADDCOMMENT",
        PAYLOAD: {
          commentText: e.target.value,
          ideaId: id,
          userName: userName,
          userImage: userImage,
        },
      });
      e.target.value = "";
    }
  };

  return (
    <div className="all-posts">
      <div className="posts-sortby">
        <label for="posts">SortBy:</label>

        <select onChange={(e) => ideasDispatch({ TYPE: e.target.value })}>
          <option hidden selected value>
            {" "}
            select an option
          </option>

          <option value="VOTES">High Votes</option>
          <option value="EARLIEST_DATE">Creation Date: Earliest</option>
          <option value="OLDEST_DATE">Creation Date: Oldest</option>
        </select>
      </div>
      <div>
        {ideas.map((idea) => {
          let user = users.find((user) => user.id === idea.userId);

          return (
            <div key={idea.id} className="idea">
              <div className="idea-heading">
                {" "}
                <img
                  className="createPost-userImage"
                  alt="userImage"
                  src={userImage}
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
                  <span className="idea-tag">{tag}</span>
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
                  onClick={(e) =>
                    ideasDispatch({
                      TYPE: "LIKE",
                      PAYLOAD: { id: idea.id, userId: loggedInUser.id },
                    })
                  }
                  aria-hidden="true"
                ></i>
                <span>{idea.votes.length}</span>
              </div>
              <div className="create-comment">
                <img
                  className="createPost-userImage"
                  src={userImage}
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
                    <div className="comment">
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
