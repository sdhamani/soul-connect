import React, { useState } from "react";

import "./createPost.css";
import { useDispatch, useSelector } from "react-redux";
import { updatePosts } from "../../actions/posts-action";
import { addPost } from "../../api/post-api";
function CreatePost() {
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const allUsers = useSelector((state) => state.allUsers);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const [showCreateIdea, setShowCreateIdea] = useState(false);
  const [tags, setTags] = useState([]);

  const addTag = (e) => {
    let liTag = e.target.innerText;
    if (tags.includes(liTag)) {
      setTags(tags.filter((tag) => tag !== liTag));
    } else {
      let newTags = [...tags, liTag];
      setTags(newTags);
    }
  };

  const createIdea = async () => {
    let user = allUsers.find((user) => (user.uid = loggedInUser.userId));

    let date = new Date();

    let newIdea = {
      userId: user.id,
      title: title,
      description: description,
      tags: tags,
      creationDate: date,
      votes: [],
    };
    const allPosts = await addPost(loggedInUser.token, newIdea);

    dispatch(updatePosts(allPosts));
    setTags([]);
    setShowCreateIdea(false);
  };

  return (
    <div className="create-post">
      <img
        className="createPost-userImage"
        alt="userImage"
        src={loggedInUser.userImage}
      ></img>
      <input
        onClick={(e) => setShowCreateIdea(true)}
        className="createPost-input"
        placeholder="Create an Idea"
        type="text"
      ></input>
      {showCreateIdea && (
        <div className="create-idea-popup">
          <div className="create-idea-heading">
            Create an Idea
            <button
              className="close-idea-popup-btn"
              onClick={(e) => setShowCreateIdea(false)}
            >
              x
            </button>
          </div>
          <hr></hr>
          <form className="createIdeaform">
            <label>Title</label>
            <input
              className="idea-title"
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
            <label>Description</label>
            <textarea
              className="idea-desc"
              row="25"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </form>
          <div className="added-tags">
            {tags.map((tag) => (
              <span className="idea-tag">
                {tag}
                <button
                  className="remove-tag-btn"
                  onClick={(e) =>
                    setTags(tags.filter((arrayTag) => arrayTag !== tag))
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
                Motivation
              </li>
              <li className="idea-tag" onClick={(e) => addTag(e)}>
                Peace
              </li>
              <li className="idea-tag" onClick={(e) => addTag(e)}>
                Routine
              </li>
            </ul>
          </div>
          <button
            disabled={title === "" || description === ""}
            className={
              title === "" || description === ""
                ? "create-idea-btn disabled"
                : "create-idea-btn"
            }
            onClick={(e) => createIdea()}
          >
            Create
          </button>
        </div>
      )}
    </div>
  );
}

export default CreatePost;
