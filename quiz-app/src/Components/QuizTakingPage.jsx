  import React, { useState } from 'react';
  import { Link } from 'react-router-dom';

  const QuizTakingPage = () => {
  const quizzes = [
  {
  id: 1,
  question: 'What is the capital of France?',
  options: ['London', 'Paris', 'Berlin', 'Madrid'],
  correctAnswer: 1,
  },
  {
  id: 2,
  question: 'Which planet is known as the Red Planet?',
  options: ['Earth', 'Venus', 'Mars', 'Jupiter'],
  correctAnswer: 2,
  },
  {
  id: 3,
  question: 'Who painted the Mona Lisa?',
  options: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Michelangelo'],
  correctAnswer: 0,
  },
  {
  id: 4,
  question: 'What is the largest mammal?',
  options: ['Elephant', 'Whale', 'Giraffe', 'Hippopotamus'],
  correctAnswer: 1,
  },
  {
  id: 5,
  question: 'Which year did the Titanic sink?',
  options: ['1910', '1912', '1920', '1930'],
  correctAnswer: 1,
  },
  {
    id: 6,
    question: 'What is the largest ocean in the world?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    correctAnswer: 3,
  },
  {
    id: 7,
    question: 'Which country is known as the Land of the Rising Sun?',
    options: ['China', 'Japan', 'South Korea', 'Vietnam'],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: 'What is the capital of Australia?',
    options: ['Melbourne', 'Sydney', 'Canberra', 'Brisbane'],
    correctAnswer: 2,
  },
  {
    id: 9,
    question: 'Who wrote the play "Romeo and Juliet"?',
    options: ['Charles Dickens', 'William Shakespeare', 'Mark Twain', 'Jane Austen'],
    correctAnswer: 1,
  },
  {
    id: 10,
    question: 'Who wrote "To Kill a Mockingbird"?',
    options: ['F. Scott Fitzgerald', 'Harper Lee', 'John Steinbeck', 'Ernest Hemingway'],
    correctAnswer: 1,
  },
  {
    id: 11,
    question: 'Which country is known as the Land of the Thunder Dragon?',
    options: ['Nepal', 'Bhutan', 'Myanmar', 'Tibet'],
    correctAnswer: 1,
  },
  {
    id: 12,
    question: 'What is the currency of Japan?',
    options: ['Yuan', 'Rupee', 'Yen', 'Dollar'],
    correctAnswer: 2,
  },
  ];


  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [scores, setScores] = useState(Array(quizzes.length).fill(0));

  const handleQuizSelection = (quizId) => {
  const selected = quizzes.find((quiz) => quiz.id === quizId);
  setSelectedQuiz(selected);
  setShowResults(false);
  setUserAnswers([]);
  setScores(Array(quizzes.length).fill(0));
  };

  const handleNextQuestion = () => {
  if (userAnswers[selectedQuiz.id - 1] === undefined) {
  alert('Please select an answer.');
  return;
  }

  const nextQuestionId = selectedQuiz.id + 1;

  if (nextQuestionId <= quizzes.length) {
  const nextSelected = quizzes.find((quiz) => quiz.id === nextQuestionId);
  setSelectedQuiz(nextSelected);
  } else {
  setShowResults(true);
  calculateScores();
  }
  };

  const handleAnswerSelection = (selectedOption) => {
  const newAnswers = [...userAnswers];
  newAnswers[selectedQuiz.id - 1] = selectedOption;
  setUserAnswers(newAnswers);
  };

  const calculateScores = () => {
  const newScores = [...scores];
  quizzes.forEach((quiz, index) => {
  if (userAnswers[index] === quiz.correctAnswer) {
    newScores[index] = 1;
  }
  });
  setScores(newScores);
  };

  const handleBack = () => {
  const previousQuestionId = selectedQuiz.id - 1;

  if (previousQuestionId >= 1) {
  const previousSelected = quizzes.find((quiz) => quiz.id === previousQuestionId);
  setSelectedQuiz(previousSelected);
  setShowResults(false);
  } else {

  }
  };

  return (
  <div style={{ backgroundColor: 'rgb(66, 125, 157)' }} className="h-screen p-8">
  {selectedQuiz && !showResults && (
  <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
    <h2 className="text-xl font-semibold mb-4">Quiz</h2>
    <p>{selectedQuiz.question}</p>
    <ul>
      {selectedQuiz.options.map((option, index) => (
        <li
          key={index}
          className={`cursor-pointer py-2 px-4 mb-2 rounded-md ${
            userAnswers[selectedQuiz.id - 1] === index
              ? index === selectedQuiz.correctAnswer
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
          onClick={() => handleAnswerSelection(index)}
        >
          {option}
          {userAnswers[selectedQuiz.id - 1] === index && (
            <span className="ml-2">
              {index === selectedQuiz.correctAnswer ? '✔️' : '❌'}
            </span>
          )}
        </li>
      ))}
    </ul>
    <div className="button-container flex justify-between">
    <button
      onClick={handleBack}
      className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md"
    >
      Back
    </button>
    <button
      onClick={handleNextQuestion}
      className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md"
    >
      {selectedQuiz.id === quizzes.length ? 'Show Results' : 'Next'}
    </button>
  </div>
  </div>
  )}
  {showResults && (
  <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
    <h2 className="text-xl font-semibold mb-4">Quiz Results</h2>
    <p className="mb-4">
      Total Score: {scores.reduce((acc, curr) => acc + curr, 0)} out of {quizzes.length}
    </p>
    <Link to="/" className=" text-left bg-blue-500 text-white py-2 px-2 mb-5 rounded-md">
        Back to Homepage
      </Link>
  </div>
  )}
  {!selectedQuiz && !showResults && (
  <div className="max-w-md mx-auto mt-0 p-6 bg-white rounded-lg shadow-xl">
    {quizzes.map((quiz, index) => (
      <div key={quiz.id} className="mb-4">
        <p onClick={() => handleQuizSelection(quiz.id)} style={{ cursor: 'pointer' }}>
          {index + 1}. {quiz.question}
        </p>
        {userAnswers[quiz.id - 1] !== undefined && (
          <div>
            <p>
              Your Answer: {quiz.options[userAnswers[quiz.id - 1]]}
              {userAnswers[quiz.id - 1] === quiz.correctAnswer
                ? ' ✔️'
                : ` ❌ (Correct Answer: ${quiz.options[quiz.correctAnswer]})`}
            </p>
            <p>
                Question {index + 1}:{' '}
                {userAnswers[quiz.id - 1] === quiz.correctAnswer ? 'Correct' : 'Incorrect'}
              </p>
            </div>
                )}
              </div>
            ))}
                <Link to="/" className=" text-left bg-blue-500 text-white py-2 px-2 mb-5 rounded-md">
                  Back to Homepage
                </Link>
          </div>
        )}
      </div>
    );
  };

  export default QuizTakingPage;
