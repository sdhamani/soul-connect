import React from "react";
import useLogin from "../../context/login-context";

import "./posts.css";
import users from "../../data/users";
import useIdeas from "../../context/ideas-context";

function Posts() {
  const { ideas, ideasDispatch } = useIdeas();
  const { employeeId } = useLogin();

  const loggedInUser = users.find((user) => user.employeeId === employeeId);

  return (
    <div>
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
          console.log({ ideas });
          let user = users.find((user) => user.id === idea.userId);
          return (
            <div key={idea.id} className="idea">
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
                <i
                  className={
                    idea.votes.includes(loggedInUser?.id)
                      ? "fa fa-arrow-up liked"
                      : "fa fa-arrow-up"
                  }
                  onClick={(e) =>
                    ideasDispatch({ TYPE: "LIKE", PAYLOAD: idea.id })
                  }
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Posts;
