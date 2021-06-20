import React from "react";
import { useState } from "react";
import "./userposts.css";
import Nav from "../navbar/Navbar";
import SideBar from "../sidebar/SideBar";

import users from "../../data/users";
import useLogin from "../../context/login-context";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, editPost } from "../../actions/posts-action";

function UserPosts() {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const { userId } = useLogin();

  const loggedInUser = users.find((user) => user.id === userId);

  const userIdeas = posts.filter((idea) => idea.userId === loggedInUser?.id);
  console.log(posts, loggedInUser, { userIdeas });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showEditIdea, setShowEditIdea] = useState(false);
  const [showDeleteIdea, setShowDeleteIdea] = useState(false);
  const [userTags, setUserTags] = useState([]);

  const addTag = (e) => {
    let liTag = e.target.innerText;
    if (userTags.includes(liTag)) {
      setUserTags(userTags.filter((tag) => tag !== liTag));
    } else {
      let newTags = [...userTags, liTag];
      setUserTags(newTags);
    }
  };

  const editIdea = (id) => {
    let today = new Date();

    let date =
      today.getDate() +
      "/" +
      parseInt(today.getMonth() + 1) +
      "/" +
      today.getFullYear();

    let newPost = {
      id: id,
      title: title,
      description: description,
      tags: userTags,
      editedDate: date,
    };
    dispatch(editPost(newPost));

    setShowEditIdea(false);
  };

  return (
    <div className="userposts-div">
      <Nav />
      <div className="userposts-content">
        <SideBar />
        <div className="userposts-posts">
          <div>
            {userIdeas.length > 0 ? (
              userIdeas.map((idea) => {
                let user = users.find((user) => user.id === idea.userId);
                return (
                  <div key={idea.id} className="idea">
                    {showDeleteIdea && (
                      <div className="delete-idea-popup">
                        <div className="delete-idea-heading">
                          Are you sure you want to delete this idea ?
                        </div>
                        <div>
                          {" "}
                          <button
                            className="delete-idea-button"
                            onClick={(e) => {
                              dispatch(deletePost(idea.id));
                              setShowDeleteIdea(false);
                            }}
                          >
                            Yes
                          </button>
                          <button
                            className="delete-idea-button"
                            onClick={(e) => setShowDeleteIdea(false)}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    )}
                    {showEditIdea && (
                      <div className="create-idea-popup">
                        <div className="create-idea-heading">
                          Edit Idea
                          <button
                            className="close-idea-popup-btn"
                            onClick={(e) => setShowEditIdea(false)}
                          >
                            x
                          </button>
                        </div>
                        <hr></hr>
                        <form className="createIdeaform">
                          <label>Title</label>
                          <input
                            defaultValue={idea.title}
                            className="idea-title"
                            type="text"
                            onChange={(e) => {
                              setTitle(e.target.value);
                            }}
                          ></input>
                          <label>Description</label>
                          <textarea
                            defaultValue={idea.description}
                            className="idea-desc"
                            row="25"
                            type="text"
                            onChange={(e) => setDescription(e.target.value)}
                          ></textarea>
                        </form>
                        <div className="added-tags">
                          {userTags.map((tag) => (
                            <span className="idea-tag">
                              {tag}
                              <button
                                className="remove-tag-btn"
                                onClick={(e) =>
                                  setUserTags(
                                    userTags.filter(
                                      (prevTag) => prevTag !== tag
                                    )
                                  )
                                }
                              >
                                x
                              </button>
                            </span>
                          ))}
                        </div>
                        <hr></hr>
                        <div className="ideas-add-tags">
                          <ul className="ideas-tag-list">
                            <li
                              className="idea-tag"
                              value="Tech"
                              onClick={(e) => addTag(e)}
                            >
                              Tech
                            </li>
                            <li className="idea-tag" onClick={(e) => addTag(e)}>
                              Feature
                            </li>
                            <li className="idea-tag" onClick={(e) => addTag(e)}>
                              Innovation
                            </li>
                          </ul>
                        </div>
                        <button
                          disabled={title === "" && description === ""}
                          className={
                            title === "" && description === ""
                              ? "create-idea-btn disabled"
                              : "create-idea-btn"
                          }
                          onClick={(e) => editIdea(idea.id)}
                        >
                          Edit
                        </button>
                      </div>
                    )}
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
                      {idea.tags.map((tag) => (
                        <span className="idea-tag">{tag}</span>
                      ))}
                    </div>
                    <hr></hr>
                    <div>
                      <button
                        className="idea-manage-btn"
                        onClick={(e) => {
                          setUserTags(idea.tags);
                          setDescription(idea.description);
                          setTitle(idea.title);
                          setShowEditIdea(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => setShowDeleteIdea(true)}
                        className="idea-manage-btn"
                      >
                        Delete
                      </button>
                    </div>
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

export default UserPosts;
