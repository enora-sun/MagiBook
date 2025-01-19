import React, { useState, useEffect } from 'react';
import NavBar from '../components/navbar.jsx';
import { questions } from "../data/questions.ts";
import { useAnswers } from '../AnswerContext';

export default function Question4() {
  const q = questions[4];
  const { answers, updateAnswer } = useAnswers(); // Access global state

  // State for current response (step 4)
  const [response, setResponse] = useState(answers[4] || '');

  // Reset the input when the page loads
  useEffect(() => {
    setResponse(answers[4] || '');
  }, [answers]);

  // Handle text input change
  const handleInputChange = (e) => {
    setResponse(e.target.value);
  };

  // Handle selection of an item
  const handleSelection = (selectedItem) => {
    setResponse(selectedItem);
  };

  // Save the response and generate story when clicking the button
  const handleGenerateStory = async () => {
    updateAnswer(4, response); // Save response in global state at index 4

    try {
      const response = await fetch('http://localhost:3000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keywords: answers }),  // Send keywords to backend
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Generated Story:', data.story);
        console.log('Generated Image URL:', data.imageUrl);
        alert('Story and image successfully generated!');
      } else {
        console.error('Error:', data.error);
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error connecting to backend:', error);
      alert('Failed to connect to the server. Please try again later.');
    }
  };

  return (
    <div className='home-wrapper'>
      <NavBar />
      <div className='question-wrapper'>
        <Header word={q.title} />
        <InputField response={response} handleInputChange={handleInputChange} />
        <Selection category={q} handleSelection={handleSelection} />

        {/* Display current keywords */}
        <CurrentKeywords answers={answers} />

        <div className='buttons-section'>
          <button 
            className="next-button abel" 
            onClick={handleGenerateStory} 
            disabled={!response}
          >
            Generate Story
          </button>
        </div>
      </div>
    </div>
  );
}

function Header({ word }) {
  return (
    <div className="header">
      <h1 className='mochiy'>
        Fifth...
        <br />
        <span className='acme'>What's your favourite {word}?</span>
      </h1>
    </div>
  );
}

function InputField({ response, handleInputChange }) {
  return (
    <div className="input-section">
      <input
        type="text"
        placeholder="Type your response here!"
        className="response-input acme"
        value={response}
        onChange={handleInputChange}
      />
      <p className="or-text abel">OR</p>
    </div>
  );
}

function Selection({ category, handleSelection }) {
  return (
    <div className="item-selection acme">
      <h2>Select a {category.title}</h2>
      <div className="item-grid">
        {category.items.map((item) => (
          <div 
            className="category-card" 
            key={item.id} 
            onClick={() => handleSelection(item.name)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={`./images/${item.image}`}
              alt={item.name}
              className="item-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Component to display the current keywords
function CurrentKeywords({ answers }) {
  return (
    <div className="current-keywords">
      <h3 className='acme'>Current Keywords:</h3>
      <ul>
        {answers.length > 0 ? (
          answers.map((answer, index) => (
            answer && <li key={index}>{answer}</li>
          ))
        ) : (
          <li>No keywords selected yet</li>
        )}
      </ul>
    </div>
  );
}
