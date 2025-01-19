import React from 'react';
import NavBar from '../components/navbar';
import { questions } from "../data/questions.ts"

export default function Question({ used }) {

  const count = questions.length;
  let random = 0;
  // do { 
  //   random = Math.floor(Math.random) % count; // 0 <= number < count
  // } while (used.includes(random));

  used = [...used, random];
  const q = questions[random];
  
  return (
    <div className='question-wrapper'>
      <NavBar/>
      <Header word={q.title} />
      <InputField />
      <Selection category={q} />
      <Buttons />
    </div>
  )
}

function Header({ word }) {
  return (
    <div className="header">
      <h1>
        First...
        <br />
        <span>What's your favourite {word}?</span>
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
        className="response-input"
      />
      <p className="or-text">OR</p>
    </div>
  );
}

function Selection({ category }) {
  return (
    <div className="item-selection">
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
      <button className="speak-button">I want to speak instead</button>
      <button className="next-button">Next</button>
    </div>
  );
}