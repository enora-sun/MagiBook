import React from 'react';
import NavBar from '../components/navbar.jsx';
import { questions } from "../data/questions.ts"
import { Link } from 'react-router-dom';

export default function Question3() {

  const q = questions[3];

  return (
    <div className='home-wrapper'>
      <NavBar />
      <div className='question-wrapper'>
        <Header word={q.title} />
        <InputField />
        <Selection category={q} />
        <div className='buttons-section'><Buttons /></div>
      </div>
    </div>

  )
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

function InputField() {
  return (
    <div className="input-section">
      <input
        type="text"
        placeholder="Type your response here!"
        className="response-input acme"
      />
      <p className="or-text abel">OR</p>
    </div>
  );
}

function Selection({ category }) {
  return (
    <div className="item-selection acme">
      <h2>Select a {category.title}</h2>
      <div className="item-grid">
        {category.items.map((item) => (
          <div className="category-card" key={item.id}>
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

function Buttons() {
  return (
    <div className="buttons-section">
      <button className="speak-button abel">I want to speak instead</button>
      <Link className='link' to="/question4"><button className="next-button abel">Next</button></Link>
    </div>
  );
}