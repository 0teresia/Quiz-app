import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthProvider';

const HomePage = () => {
  const { authUser, logout } = useAuth(); 
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="relative" style={{ backgroundColor: 'rgb(66, 125, 157)' }}>

      <div className="absolute top-0 right-0 m-4">
        {authUser ? (
          <button onClick={handleLogout} style={{ backgroundColor: 'rgb(221, 242, 253)' }} className=" text-black py-2 px-4 rounded-md hover:bg-red-600">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" style={{ backgroundColor: 'rgb(221, 242, 253)' }} className="mr-4 text-black py-2 px-4 rounded-md hover:bg-yellow-600">
              Login
            </Link>
            <Link to="/signup" style={{ backgroundColor: 'rgb(221, 242, 253)' }} className=" text-black py-2 px-4 rounded-md hover:bg-blue-600">
              SignUp
            </Link>
          </>
        )}
      </div>

      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-8">Welcome to Online Quiz Maker</h1>
        <div className="flex flex-col gap-4">
          {authUser && (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
