import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import CreateQuizPage from './Components/CreateQuizPage';
import QuizTakingPage from './Components/QuizTakingPage';

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateQuizPage />} />
          <Route path="/take" element={<QuizTakingPage />} /> {/* Use 'element' instead of 'component' */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;



