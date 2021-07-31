import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import "./userposts.css";
import { Nav } from "../navbar/Navbar";
import SideBar from "../sidebar/SideBar";

import { useDispatch, useSelector } from "react-redux";
import {
  updatePosts,
  deletePosts,
  editPosts,
} from "../../actions/posts-action";

function UserPosts() {
  const allUsers = useSelector((state) => state.allUsers);
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const MemoizedNavbar = useCallback(Nav, []);

  const loggedInUser = useSelector((state) => state.loggedInUser);

  const userPosts = posts.filter(
    (post) => post.userId === loggedInUser?.userId
  );

  useEffect(() => {
    dispatch(updatePosts());
  }, [dispatch]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showEditIdea, setShowEditIdea] = useState(null);
  const [showDeleteIdea, setShowDeleteIdea] = useState(null);
  const [userTags, setUserTags] = useState([]);

  const showEditModel = () => {
    return (
      <div className="create-idea-popup">
        <div className="create-idea-heading">
          Edit Idea
          <button
            className="close-idea-popup-btn"
            onClick={(e) => setShowEditIdea(null)}
          >
            x
          </button>
        </div>

        <hr></hr>
        <form className="createIdeaform">
          <label>Title</label>
          <input
            defaultValue={showEditIdea.title}
            className="idea-title"
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
          <label>Description</label>
          <textarea
            defaultValue={showEditIdea.description}
            className="idea-desc"
            row="25"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </form>
        <div className="added-tags">
          {userTags.map((tag) => (
            <span key={tag} className="idea-tag">
              {tag}
              <button
                className="remove-tag-btn"
                onClick={(e) =>
                  setUserTags(userTags.filter((prevTag) => prevTag !== tag))
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
            <li className="idea-tag" value="Tech" onClick={(e) => addTag(e)}>
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
          onClick={(e) => editIdea(showEditIdea._id)}
        >
          Edit
        </button>
      </div>
    );
  };

  const showDeleteModel = () => {
    return (
      <div className="delete-idea-popup">
        <div className="delete-idea-heading">
          Are you sure you want to delete this idea ?
        </div>
        <div>
          {" "}
          <button
            className="delete-idea-button"
            onClick={(e) => {
              dispatch(deletePosts(loggedInUser.token, showDeleteIdea._id));
              setShowDeleteIdea(null);
            }}
          >
            Yes
          </button>
          <button
            className="delete-idea-button"
            onClick={(e) => setShowDeleteIdea(null)}
          >
            No
          </button>
        </div>
      </div>
    );
  };
  const addTag = (e) => {
    let liTag = e.target.innerText;
    if (userTags.includes(liTag)) {
      setUserTags(userTags.filter((tag) => tag !== liTag));
    } else {
      let newTags = [...userTags, liTag];
      setUserTags(newTags);
    }
  };

  const editIdea = (postId) => {
    let today = new Date();

    let date =
      today.getDate() +
      "/" +
      parseInt(today.getMonth() + 1) +
      "/" +
      today.getFullYear();

    let newPost = {
      title: title,
      description: description,
      tags: userTags,
      editedDate: date,
    };

    dispatch(editPosts(loggedInUser.token, newPost, postId));

    setShowEditIdea(null);
  };

  return (
    <div className="userposts-div">
      <MemoizedNavbar />
      <div className="userposts-content">
        <SideBar />
        <div className="userposts-posts">
          <div>
            {userPosts.length > 0 ? (
              userPosts.map((idea, index) => {
                let user = allUsers.find((user) => user._id === idea.userId);

                return (
                  <div key={index} className="idea">
                    {showDeleteIdea !== null && showDeleteModel()}
                    {showEditIdea !== null && showEditModel()}
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
                        <span key={tag} className="idea-tag">
                          {tag}
                        </span>
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
                          setShowEditIdea(idea);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => setShowDeleteIdea(idea)}
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
