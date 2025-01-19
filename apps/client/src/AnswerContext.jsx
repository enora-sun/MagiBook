import { createContext, useContext, useState } from 'react';

// Create context
const AnswerContext = createContext();

// Context provider component
export const AnswerProvider = ({ children }) => {
  const [answers, setAnswers] = useState([]); // Initially empty array

  // Function to update answers array
  const updateAnswer = (step, answer) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[step] = answer;
      return newAnswers;
    });
  };

  // Function to reset answers
  const resetAnswers = () => {
    setAnswers([]);  // Reset answers to empty array
  };

  return (
    <AnswerContext.Provider value={{ answers, updateAnswer, resetAnswers }}>
      {children}
    </AnswerContext.Provider>
  );
};

// Custom hook to use the context in components
export const useAnswers = () => useContext(AnswerContext);