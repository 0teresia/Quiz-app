import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from '../firebaseConfig'; 

const auth = getAuth(app);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential) {
        navigate("/"); 
      }
    } catch (err) {
      setError(err.message); 
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  return (
    <div className="h-screen " style={{ backgroundColor: 'rgb(66, 125, 157)' }}>
    <div className="container flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 content-center p-20">
          <div className="signup-img ml-20">
          </div>
          <div className="">
            <p className="font-bold text-2xl">Login to your account</p>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  className="md:w-96 w-full mt-5 border-emerald-400 outline-emerald-400 border-2 rounded p-2"
                  type="email"
                  value={email}
                  placeholder="Enter E-mail"
                  required={true}
                  onChange={handleEmailChange}
                />
                {error && (
                  <span className="flex font-medium tracking-wide text-red-500 text-xs mt-1">
                    {error}
                  </span>
                )}
              </div>
              <div>
                <input
                  className="md:w-96 w-full mt-5 border-emerald-400 outline-emerald-400 border-2 rounded p-2"
                  type="password"
                  value={password}
                  placeholder="Enter Password"
                  required={true}
                  onChange={handlePasswordChange}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="text-lg bg-emerald-400 text-white outline-emerald-400 mt-5 md:w-96 w-full p-2 hover:bg-emerald-600 gap-0 rounded"
              >
                {loading ? 'Loading...' : 'LogIn'}
              </button>
              <p className="text-lg text-white outline-red-400 mt-5 md:w-96 w-full p-2 gap-0 rounded">
                {error}
              </p>
              <p className="text-sm font-light text-white dark:text-gray-400 mt-5">
                Don't have an account? 
                <NavLink to="/signUp" className="ml-2 text-primary-800 underline font-bold dark:text-primary-500">
                  SignUp here
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
