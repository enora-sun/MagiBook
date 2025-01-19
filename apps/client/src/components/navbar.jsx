import React from 'react';
import { Link } from 'react-router-dom';
import bookIcon from '../images/logo-book.png';
import homeIcon from '../images/icon-home.png'; 
import cardsIcon from '../images/icon-cards.png'; 
import profileIcon from '../images/icon-profile.png';
import settingsIcon from '../images/icon-settings.png';

export default function NavBar() {
  return (
    <div className="nav">
      <div className="nav-logo">
        <img src={bookIcon} alt="Logo" className="icon nav-logo-icon" />
      </div>
      <hr className="nav-divider" />
      <div className="nav-item">
        <Link to="/home">
          <img src={homeIcon} alt="Home" className="nav-icon" />
        </Link>
      </div>
      <div className="nav-item">
        <Link to="/cards">
          <img src={cardsIcon} alt="Cards" className="nav-icon" />
        </Link>
      </div>
      <div className="nav-item">
        <Link to="/user">
          <img src={profileIcon} alt="Profile" className="nav-icon" />
        </Link>
      </div>
      <div className="nav-item">
        <Link to="/settings">
          <img src={settingsIcon} alt="Settings" className="nav-icon" />
        </Link>
      </div>
    </div>
  );
}