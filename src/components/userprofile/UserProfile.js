import React from "react";
import Nav from "../navbar/Navbar";
import "./userprofile.css";
import { useParams } from "react-router";
import { updateFollowing } from "../../actions/users-actions";
import { useDispatch, useSelector } from "react-redux";

function UserProfile() {
  const { searcheduserId } = useParams();

  const posts = useSelector((state) => state.posts);

  const allUsers = useSelector((state) => state.allUsers);

  const dispatch = useDispatch();
  const { userId } = JSON.parse(localStorage?.getItem("user"));

  const LoggedInUser = allUsers.find((user) => user.id === userId);

  const searchedUser = allUsers.find((user) => user.id === searcheduserId);

  const userIdeas = posts.filter((idea) => idea.userId === searchedUser?.id);

  return (
    <div className="userposts-div">
      <Nav />
      <div className="userposts-content">
        <div className="sidebar">
          <div>
            <div className="sidebar-heading">
              <img
                className="sidebar-userImage"
                alt="userImage"
                src={searchedUser.profileImage}
              ></img>
              <span className="sidebar-userName">{searchedUser.name}</span>
            </div>

            <div className="sidebar-myposts">
              <button
                className="follow-btn"
                onClick={(e) =>
                  dispatch(updateFollowing(searchedUser.id, LoggedInUser.id))
                }
              >
                {LoggedInUser.following.includes(searcheduserId)
                  ? "Following"
                  : "Follow"}
              </button>
            </div>
          </div>
        </div>
        <div className="userposts-posts">
          <div>
            {userIdeas.length > 0 ? (
              userIdeas.map((idea) => {
                let user = allUsers.find((user) => user.id === idea.userId);

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
                    <div className="added-tags-posts">
                      {idea.tags.map((tag, index) => (
                        <span key={index} className="idea-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <hr></hr>
                  </div>
                );
              })
            ) : (
              <div className="no-posts-text">No ideas posted yet !!!!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
