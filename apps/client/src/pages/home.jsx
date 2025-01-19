import React from 'react';
import NavBar from '../components/navbar';
import WelcomeSection from '../components/welcome';

export default function Home() {
  return (
    <div className='home-wrapper'>
      <NavBar />
      <div className="content-wrapper">
        <WelcomeSection />
      </div>
    </div>
  )
}