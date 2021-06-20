import React from "react";
import "./news.css";

function News() {
  return (
    <div className="homepage-news">
      <span className="news-heading">Hack Ideas News</span>
      <ul className="homepage-news-list">
        <li className="homepage-news-list-item">
          Anurag Rathod has commented on your post "Great Post".
        </li>
        <li className="homepage-news-list-item">
          Anurag Rathod has like your post.
        </li>
        <li className="homepage-news-list-item">Rajeev has liked your post.</li>
        <li className="homepage-news-list-item">
          Try using our new add tags feature while creating the post.
        </li>
        <li className="homepage-news-list-item">
          Ravina has like your picture.
        </li>
      </ul>
    </div>
  );
}

export default News;
