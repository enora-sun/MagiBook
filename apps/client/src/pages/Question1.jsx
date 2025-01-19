import React, { useState, useEffect } from 'react';
import NavBar from '../components/navbar.jsx';
import { questions } from "../data/questions.ts";
import { Link } from 'react-router-dom';
import { useAnswers } from '../AnswerContext';

export default function Question1() {
  const q = questions[1];
  const { answers, updateAnswer } = useAnswers(); // Get global state

  // State for current response (step 1)
  const [response, setResponse] = useState(answers[1] || '');

  // Reset the input when the page loads (optional)
  useEffect(() => {
    setResponse(answers[1] || '');
  }, [answers]);

  // Handle text input change
  const handleInputChange = (e) => {
    setResponse(e.target.value);
  };

  // Handle selection of item
  const handleSelection = (selectedItem) => {
    setResponse(selectedItem);
  };

  // Save the response before moving to the next question
  const handleNextClick = () => {
    updateAnswer(1, response); // Store response in global state at index 1
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
          <Buttons response={response} handleNextClick={handleNextClick} />
        </div>
      </div>
    </div>
  );
}

function Header({ word }) {
  return (
    <div className="header">
      <h1 className='mochiy'>
        Second...
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

function Buttons({ response, handleNextClick }) {
  return (
    <div className="buttons-section">
      <button className="speak-button abel">I want to speak instead</button>
      <Link 
        className='link' 
        to="/question2" 
        onClick={handleNextClick}
      >
        <button className="next-button abel" disabled={!response}>
          Next
        </button>
      </Link>
    </div>
  );
}
