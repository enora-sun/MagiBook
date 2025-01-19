import React from 'react';
import NavBar from '../components/navbar';

const flashcards = [
  { id: 1, title: "the Small Egg", translation: "小鸡蛋", description: "the Small Egg (EN - CH)", color: "#C4E7A6" },
  { id: 2, title: "the Smaller Egg", translation: "小鸡蛋", description: "the Smaller Egg (EN - CH)", color: "#9DCFFB" },
  { id: 3, title: "the Even Smaller Egg", translation: "小鸡蛋", description: "the Even Smaller Egg (EN - CH)", color: "#F8C35E" },
  { id: 4, title: "Waffle World", translation: "华夫饼世界", description: "Waffle World (EN - CH)", image: "waffle-world.png" }
];

export default function Cards() {
  return (
    <div className='home-wrapper'>
      <NavBar />
      <div className="cards-wrapper">
        <h1 className="title mochiy">My Flashcards</h1>
        <div className="flashcards-grid">
          {flashcards.map((card) => (
            <div
              key={card.id}
              className="flashcard"
              style={{ backgroundColor: card.color || '#fff' }}
            >
              {card.image ? (
                <img src={card.image} alt={card.title} className="flashcard-image" />
              ) : (
                <>
                  <h3><span className="bold-text">the</span> {card.title.split("the ")[1]}</h3>
                  <p>{card.translation}</p>
                  <span className="description">{card.description}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}