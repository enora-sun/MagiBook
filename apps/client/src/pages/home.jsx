import React from 'react';
import NavBar from '../components/navbar';
import WelcomeSection from '../components/welcome';
import StoryCollection from '../components/storyCollection';
import FavouritesSection from '../components/favouritesCollection';

import Babar from "../images/book-babar.png";
import Frog from "../images/book-frog.png";
import Journey from "../images/book-journey.png";
import Egg from "../images/book-egg.png";
import Poppy from "../images/book-poppy.png";

export default function Home() {

  const stories = [
    { title: "the Small Egg", subtitle: "小鸡蛋" },
    { title: "the Smaller Egg", subtitle: "小鸡蛋 (EN - CH)" },
    { title: "the Even Smaller Egg", subtitle: "小鸡蛋 (EN - CH)" },
  ];

  const favourites = [
    { title: "The Story of a Little Frog", image: `${Frog}` },
    { title: "Journey to the Stars", image: `${Journey}` },
    { title: "The Good Egg", image: `${Egg}` },
    { title: "The Story of Babar", image: `${Babar}` },
    { title: "Green Thumb Poppy", image: `${Poppy}`}
  ];

  return (
    <div className='home-wrapper'>
      <NavBar />
      <div className="content-wrapper">
        <WelcomeSection />
        <StoryCollection stories={stories} />
        <FavouritesSection favourites={favourites} />
      </div>
    </div>
  )
}