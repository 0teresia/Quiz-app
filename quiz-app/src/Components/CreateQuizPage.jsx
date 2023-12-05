import React, { useState } from 'react';

const CreateQuizPage = () => {
  const createInitialQuestionState = () => ({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: null,
  });

  const [questions, setQuestions] = useState([
    createInitialQuestionState(),
    createInitialQuestionState(),
    createInitialQuestionState(),
    createInitialQuestionState(),
  ]);
  const [saved, setSaved] = useState(false);

  const handleQuestionChange = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], question: event.target.value };
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswer = optionIndex;
    setQuestions(updatedQuestions);
  };

  const saveQuiz = () => {
    const allQuestionsFilled = questions.every(
      (question) => question.question.trim() !== '' && question.options.every((option) => option.trim() !== '')
    );

    if (allQuestionsFilled) {
      localStorage.setItem('savedQuiz', JSON.stringify(questions));
      setQuestions([
        createInitialQuestionState(),
        createInitialQuestionState(),
        createInitialQuestionState(),
        createInitialQuestionState(),
      ]);
      setSaved(true);
    } else {
      alert('Please fill in all questions and options before saving.');
    }
  };

  const renderQuestions = () => {
    return questions.map((question, index) => (
      <div key={index} className="bg-gray-100 rounded-md p-4 mb-4">
        <label className="block mb-2 font-semibold" htmlFor={`question-${index + 1}`}>
          Question {index + 1}
        </label>
        <input
          type="text"
          id={`question-${index + 1}`}
          value={question.question}
          onChange={(e) => handleQuestionChange(index, e)}
          className="border rounded-md p-2 mb-2 w-full"
        />
        {question.options.map((option, optionIndex) => (
          <div key={optionIndex} className="flex items-center mb-2">
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, optionIndex, e)}
              className="border rounded-md p-2 w-full mr-2"
            />
            <input
              type="radio"
              name={`correct-answer-${index + 1}`}
              checked={question.correctAnswer === optionIndex}
              onChange={() => handleCorrectAnswerChange(index, optionIndex)}
              className="mr-2"
            />
            <label htmlFor={`correct-answer-${index + 1}-${optionIndex + 1}`}>Correct Answer</label>
          </div>
        ))}
      </div>
    ));
  };

  const loadSavedQuiz = () => {
    const savedQuiz = JSON.parse(localStorage.getItem('savedQuiz'));
    if (savedQuiz) {
      setQuestions(savedQuiz);
      setSaved(true);
    } else {
      alert('No saved quiz found.');
    }
  };

  const createNewQuiz = () => {
    setQuestions([
      createInitialQuestionState(),
      createInitialQuestionState(),
      createInitialQuestionState(),
      createInitialQuestionState(),
    ]);
    setSaved(false);
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-4">Create Quiz</h2>
      {renderQuestions()}
      <button onClick={saveQuiz} className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md mr-2">
        Save Quiz
      </button>
      <button onClick={createNewQuiz} className="bg-gray-500 text-white py-2 px-4 mt-4 rounded-md">
        Create New Quiz
      </button>
      {saved && (
        <button onClick={loadSavedQuiz} className="bg-green-500 text-white py-2 px-4 mt-4 rounded-md ml-2">
          Load Saved Quiz
        </button>
      )}
    </div>
  );
};

export default CreateQuizPage;


