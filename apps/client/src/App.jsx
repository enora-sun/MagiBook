import { Route, Routes, useLocation } from 'react-router-dom';
import './styles.css';

import Login from "./pages/login";
import Home from './pages/home';

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App;