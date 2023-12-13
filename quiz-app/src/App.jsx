import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import CreateQuizPage from './Components/CreateQuizPage';
import QuizTakingPage from './Components/QuizTakingPage';
import LoginPage from './Components/LoginPage';
import SignUp from './Components/SignUp';

const App = () => {
  return (
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateQuizPage />} />
          <Route path="/take" element={<QuizTakingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />  
        </Routes>
      </div>
  );
};

export default App;


