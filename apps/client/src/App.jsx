import { Route, Routes, useLocation } from 'react-router-dom';
import './styles.css';

import Login from "./pages/login";
import Home from './pages/home';
import Settings from './pages/settings';
import Cards from './pages/cards';
import User from './pages/user';
import Question0 from './pages/Question0';
import Question1 from './pages/Question1';
import Question2 from './pages/Question2';
import Question3 from './pages/Question3';
import Question4 from './pages/Question4';
import StoryIntro from './pages/intro';
import Story from './pages/story';

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/cards" element={<Cards />}/>
        <Route path="/user" element={<User />}/>
        <Route path="/question0" element={<Question0 />}/>
        <Route path="/question1" element={<Question1 />}/>
        <Route path="/question2" element={<Question2 />}/>
        <Route path="/question3" element={<Question3 />}/>
        <Route path="/question4" element={<Question4 />}/>
        <Route path="/intro" element={<StoryIntro />}/>
        <Route path="/story" element={<Story />}/>
      </Routes>
    </div>
  )
}

export default App;