import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/navbar';

export default function Story() {
  const location = useLocation();
  const navigate = useNavigate();
  const { story, translatedStory, imageUrl } = location.state || {};

  // Function to extract title from the text
  function extractTitle(text) {
    const match = text.match(/\*\*(?:Title|标题)[:：]\s*(.*?)\*\*/);
    return match ? match[1].trim() : 'No title found';
  }

  // Function to extract body from the text
  function extractBody(text) {
    let count = 0;
    let i = 0;
    while (count < 4) {
      if (text.charAt(i) === '*') count++;
      i++;
    }
    return text.substring(i + 1).trim();
  }

  // Parse English story
  const title = extractTitle(story);
  const body = extractBody(story);

  // Parse Translated story
  const trTitle = extractTitle(translatedStory);
  const trBody = extractBody(translatedStory);

  // Redirect to home if no data is passed
  if (!story || !imageUrl) {
    navigate('/');
    return null;
  }

  // State to toggle the visibility of the translated story
  const [showTranslation, setShowTranslation] = useState(false);

  return (
    <div className='home-wrapper'>
      <NavBar />
      <div className="story-page">
        <h1 className="mochiy">Your Generated Story</h1>
        <img src={imageUrl} alt="Generated" className="story-image" />

        {/* English Story */}
        <h1 className='story-title mochiy'>{title}</h1>
        <p className="story-text abel">{body}</p>

        {/* Button to toggle translation */}
        <button 
          className="next-button toggle-btn" 
          onClick={() => setShowTranslation(!showTranslation)}
        >
          {showTranslation ? 'Hide Translation' : 'Show Translation'}
        </button>

        {/* Translated Story (hidden initially) */}
        {showTranslation && (
          <>
            <h1 className='story-title mochiy'>{trTitle}</h1>
            <p className="story-text abel">{trBody}</p>
          </>
        )}
      </div>
    </div>
  );
}
