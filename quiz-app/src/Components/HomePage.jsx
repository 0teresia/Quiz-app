import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Welcome to Online Quiz Maker</h1>
      <div className="flex flex-col gap-4">
        <Link
          to="/create"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Create a Quiz
        </Link>
        <Link
          to="/take"
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Take a Quiz
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

