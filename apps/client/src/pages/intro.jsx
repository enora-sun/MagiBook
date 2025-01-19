import React from 'react';
import NavBar from '../components/navbar';
import { Link } from 'react-router-dom';

import IntroImg from '../images/illustr-intro.png';

export default function StoryIntro() {

  const title = "Waffle World";
  const mandarin = "华夫饼世界"

  return (
    <div className='home-wrapper'>
      <NavBar />
      <div className='intro-wrapper'>
        <h1 className='mochiy'>{title}</h1>
        <h1 className='acme'>{mandarin}</h1>
        <img className='intro-img' src={IntroImg} />
        <div className='button'><Button /></div>
      </div>
    </div>
  )
}

function Button() {
  return (
    <div className="button">
      <Link className='link' to="/story"><button className="next-button abel">Next</button></Link>
    </div>
  );
}
