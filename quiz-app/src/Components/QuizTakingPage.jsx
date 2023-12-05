import React, { useState } from 'react';

const QuizListingPage = () => {
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
        id: 17,
        question: 'Who wrote "To Kill a Mockingbird"?',
        options: ['F. Scott Fitzgerald', 'Harper Lee', 'John Steinbeck', 'Ernest Hemingway'],
        correctAnswer: 1,
      },
      {
        id: 19,
        question: 'Which country is known as the Land of the Thunder Dragon?',
        options: ['Nepal', 'Bhutan', 'Myanmar', 'Tibet'],
        correctAnswer: 1,
      },
      {
        id: 20,
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

  const renderQuizList = () => {
    return (
      <div>
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="mb-4">
            <p onClick={() => handleQuizSelection(quiz.id)} style={{ cursor: 'pointer' }}>
              {quiz.question}
            </p>
          </div>
        ))}
        {showResults && (
          <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Quiz Results</h2>
            {quizzes.map((quiz, index) => (
              <div key={quiz.id}>
                <p>
                  Question {index + 1}: {userAnswers[index] === quiz.correctAnswer ? 'Correct' : 'Incorrect'}
                </p>
                <p>
                  Your Answer: {quiz.options[userAnswers[index]]}
                  {userAnswers[index] === quiz.correctAnswer ? ' ✔️' : ` ❌ (Correct Answer: ${quiz.options[quiz.correctAnswer]})`}
                </p>
              </div>
            ))}
            <p className="mb-4">Total Score: {scores.reduce((acc, curr) => acc + curr, 0)} out of {quizzes.length}</p>
            <button onClick={() => setShowResults(false)}>Back to Quiz List</button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-4">Quiz Listing</h2>
      {selectedQuiz ? (
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
                      ? 'bg-green-500 text-white' // Highlight correct answer
                      : 'bg-red-500 text-white' // Highlight wrong answer
                    : 'bg-gray-100 hover:bg-gray-200' // Default style
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
          <button
            onClick={handleNextQuestion}
            className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md"
          >
            Next
          </button>
        </div>
      ) : (
        renderQuizList()
      )}
    </div>
  );
};

export default QuizListingPage;

