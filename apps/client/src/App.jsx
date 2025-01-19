import { Route, Routes, useLocation } from 'react-router-dom';
import './styles.css';

import Login from "./pages/login";
import Home from './pages/home';
import Settings from './pages/settings';
import Cards from './pages/cards';
import User from './pages/user';
import Question from './pages/Question';

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/cards" element={<Cards />}/>
        <Route path="/user" element={<User />}/>
        <Route path="/question" element={<Question used={[]} />}/>
      </Routes>
    </div>
  )
}

export default App;