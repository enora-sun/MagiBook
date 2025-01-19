import React, { useState, useEffect } from 'react';
import NavBar from '../components/navbar.jsx';
import { questions } from "../data/questions.ts";
import { Link } from 'react-router-dom';
import { useAnswers } from '../AnswerContext';
import Dessert0 from '../images/dessert-1.png';
import Dessert1 from '../images/dessert-2.png';
import Dessert2 from '../images/dessert-3.png';
import Dessert3 from '../images/dessert-4.png';
import Dessert4 from '../images/dessert-5.png';

export default function Question0() {
  const q = questions[0];
  const { answers, updateAnswer, resetAnswers } = useAnswers(); 

  // Reset answers when the component mounts
  useEffect(() => {
    resetAnswers();
  }, []);  // Empty dependency array ensures this runs only once on mount

  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    setResponse(e.target.value);
  };

  const handleSelection = (selectedItem) => {
    setResponse(selectedItem);
  };

  const handleNextClick = () => {
    updateAnswer(0, response); // Save response to global state
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
        First...
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
  const imgs = [Dessert0, Dessert1, Dessert2, Dessert3, Dessert4];
  return (
    <div className="item-selection acme">
      <h2>Select a {category.title}</h2>
      <div className="item-grid">
        {category.items.map((item, index) => (
          <div 
            className="category-card" 
            key={item.id} 
            onClick={() => handleSelection(item.name)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={imgs[index]}
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
        to="/question1" 
        onClick={handleNextClick}
      >
        <button className="next-button abel" disabled={!response}>
          Next
        </button>
      </Link>
    </div>
  );
}