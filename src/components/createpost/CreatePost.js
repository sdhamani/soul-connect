import React, { useState } from "react";
import useIdeas from "../../context/ideas-context";
import useLogin from "../../context/login-context";
import users from "../../data/users";
import "./createPost.css";
import { v4 as uuidv4 } from "uuid";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { employeeId } = useLogin();
  let { ideas, setIdeas } = useIdeas();
  const [ShowCreateIdea, setShowCreateIdea] = useState(false);
  const [tags, setTags] = useState([]);

  const user = users.find((user) => user.employeeId === employeeId);
  const addTag = (e) => {
    let liTag = e.target.innerText;

    if (tags.includes(liTag)) {
      setTags(tags.filter((tag) => tag !== liTag));
    } else {
      let newTags = [...tags, liTag];
      setTags(newTags);
    }
  };

  const createIdea = () => {
    let user = users.find((user) => (user.employeeId = employeeId));
    console.log("t", title, "des", description);
    let newDate = new Date();
    let newIdea = {
      id: uuidv4(),
      hackathon: "May21",
      userId: user.id,
      title: title,
      description: description,
      tags: tags,
      creationDate: newDate,
      votes: [],
    };
    console.log("newobj", newIdea);
    let newArray = [...ideas, newIdea];
    setIdeas(newArray);
  };

  return (
    <div className="create-post">
      <img
        className="createPost-userImage"
        alt="userImage"
        src={user?.profileImage}
      ></img>
      <input
        onClick={(e) => setShowCreateIdea(true)}
        className="createPost-input"
        placeholder="Start a Post"
        type="text"
      ></input>
      {ShowCreateIdea && (
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
                console.log("E", e);
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
          <button className="create-idea-btn" onClick={(e) => createIdea()}>
            Create
          </button>
        </div>
      )}
    </div>
  );
}

export default CreatePost;
