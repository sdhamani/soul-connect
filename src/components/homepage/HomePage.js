import React from "react";
import Nav from "../navbar/Navbar";
import SideBar from "../sidebar/SideBar";
import CreatePost from "../createpost/CreatePost";
import "./homepage.css";
import News from "../news/News";
import Posts from "../posts/Posts";

export default function HomePage() {
  return (
    <div className="homepage-div">
      <Nav />
      <div className="homepage-content">
        <SideBar />
        <div className="homepage-posts">
          <CreatePost />
          <Posts />
        </div>
        <News />
      </div>
    </div>
  );
}
