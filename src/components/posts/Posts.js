import React from "react";
import useLogin from "../../context/login-context";
import ideas from "../../data/ideas";
import "./posts.css";
import users from "../../data/users";

function Posts() {
  const { employeeId, userName } = useLogin();

  return (
    <div>
      {ideas.map((idea) => {
        let user = users.find((user) => user.id === idea.userId);
        return (
          <div className="idea">
            <div className="idea-heading">
              {" "}
              <img
                className="createPost-userImage"
                alt="userImage"
                src={user?.profileImage}
              ></img>
              <div>
                <div>{user.name}</div>
                <div className="idea-date">{idea.creationDate}</div>
              </div>
            </div>
            <div className="idea-heading-title">{idea.title}</div>
            <div className="idea-description">{idea.description}</div>
            <hr></hr>
            <div>
              <i class="fa fa-arrow-up" aria-hidden="true"></i>
              <i class="fa fa-arrow-down" aria-hidden="true"></i>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
