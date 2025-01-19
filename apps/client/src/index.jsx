import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import { AnswerProvider } from './AnswerContext';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AnswerProvider>
    <Router>
      <App />
    </Router>
  </AnswerProvider>
);
