import React from "react";
import Nav from "../navbar/Navbar";
import SideBar from "../sidebar/SideBar";
import CreatePost from "../createpost/CreatePost";
import "./homepage.css";

export default function HomePage() {
  return (
    <div className="homepage-div">
      <Nav />
      <div className="homepage-content">
        <SideBar />
        <div className="homepage-posts">
          <CreatePost />
        </div>
        <div className="homepage-news">
          <span className="news-heading">Hack Ideas News</span>
          <ul className="homepage-news-list">
            <li>Ideas for the May month Hackton will start soon.</li>
            <li>Ideas for the May month Hackton will start soon.</li>
            <li>Ideas for the May month Hackton will start soon.</li>

            <li>Ideas for the May month Hackton will start soon.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
