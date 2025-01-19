import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/navbar';

export default function Story() {
  const location = useLocation();
  const navigate = useNavigate();
  const { story, imageUrl } = location.state || {};

  // Redirect to home if no data is passed
  if (!story || !imageUrl) {
    navigate('/');
    return null;
  }

  return (
    <div className='home-wrapper'>
      <NavBar />
      <div className="story-page">
        <h1 className="mochiy">Your Generated Story</h1>
        <img src={imageUrl} alt="Generated" className="story-image" />
        <p className="story-text abel">{story}</p>
      </div>
    </div>
  );
}
