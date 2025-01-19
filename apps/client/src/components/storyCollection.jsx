import React from "react";

export default function StoryCollection({ stories }) {
  
  const colors = ["green", "blue", "yellow"]

  return (
    <div className="story-collection">
      <h2 className="acme">Your Story Collection</h2>
      <div className="stories-grid">
        <div className="story-card new-story acme">
          <span>+</span>
          <p>Create New Story</p>
        </div>
        <div className="vertical-line"></div>
        {stories.map((story, index) => (
          <div className={`story-card ${colors[index % 3]}`} key={index}>
            <h3>{story.title}</h3>
            <p>{story.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}