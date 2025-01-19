import { Route, Routes, useLocation } from 'react-router-dom';
import './styles.css';

import Login from "./pages/login";

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App;