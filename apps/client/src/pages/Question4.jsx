import React, { useState, useEffect } from 'react';
import NavBar from '../components/navbar.jsx';
import { questions } from "../data/questions.ts";
import { useAnswers } from '../AnswerContext';
import { useNavigate } from 'react-router-dom';
import Img0 from '../images/superman.jpg';
import Img1 from '../images/batman.png';
import Img2 from '../images/spiderman.png';
import Img3 from '../images/iron-man.png';
import Img4 from '../images/wonder-woman.png';

export default function Question4() {
  const q = questions[4];
  const { answers, updateAnswer } = useAnswers();
  const navigate = useNavigate();  // Hook to navigate to another route

  const [response, setResponse] = useState(answers[4] || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setResponse(answers[4] || '');
  }, [answers]);

  const handleInputChange = (e) => {
    setResponse(e.target.value);
  };

  const handleSelection = (selectedItem) => {
    setResponse(selectedItem);
  };

  const handleGenerateStory = async () => {
    updateAnswer(4, response);

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:3000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keywords: answers }),
      });

      if (!res.ok) {
        throw new Error();
      }

      const data = await res.json();

      // Navigate to the /story route and pass the data as state
      navigate('/story', { state: { story: data.story, translatedStory: data.translatedStory, imageUrl: data.imageUrl } });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='home-wrapper'>
      <NavBar />
      <div className='question-wrapper'>
        <Header word={q.title} />
        <InputField response={response} handleInputChange={handleInputChange} />
        <Selection category={q} handleSelection={handleSelection} />
        
        <CurrentKeywords answers={answers} />

        <div className='buttons-section'>
          <button className="next-button abel" onClick={handleGenerateStory} disabled={!response || loading}>
            {loading ? 'Generating...' : 'Generate Story'}
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}
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
  const imgs = [Img0, Img1, Img2, Img3, Img4];
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
