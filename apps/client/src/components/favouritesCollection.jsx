import React from "react";

export default function FavoritesSection({ favourites }) {

  const favoritesGrid = favourites.map((favorite, index) => (
    <div className="favorite-card" key={index}>
      <img src={favorite.image} alt={favorite.title} />
      <p>{favorite.title}</p>
    </div>
  ))

  return (
    <div className="favorites-section">
      <h2 className="favorites-h2 acme">Our Favourites</h2>
      <div className="favorites-grid">
        {favoritesGrid}
      </div>
    </div>
  );
}
