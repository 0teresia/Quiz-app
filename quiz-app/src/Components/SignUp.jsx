import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../firebaseConfig"; // Import your Firebase app instance

const auth = getAuth(app);

export default function SignUp() {
  const [username, setUserName] = useState('');
  const [usernameError, setUserNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setPasswordError('');
    setUserNameError('');

    if (password !== confirmPassword) {
      setPasswordError("Password doesn't match");
      return;
    }
    if (username.length < 3) {
      setUserNameError('Username must be greater than or equal to 3 characters');
      return;
    }
    if (password.length < 6) {
      setPasswordError('Password must be 6 characters');
      return;
    }

    setLoading(true);
    try {
      // Firebase signup method
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(err.message);
      console.log(err);
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleUsernameChange(e) {
    setUserName(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleConfirmPasswordChange(e) {
    setConfirmPassword(e.target.value);
  }

  function handleCheckBoxChange(e) {
    setAgree(e.target.checked);
  }

  return (
    <div className="h-screen" style={{ backgroundColor: 'rgb(66, 125, 157)' }}>
    <div className="container flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 content-center p-20">
        <form className="mt-10 justify-self-end" onSubmit={handleSubmit}>
              <h2 className="font-bold text-2xl text-start">Create an account</h2>
              <div>
                <input className="md:w-96 w-full mt-5 border-emerald-400 outline-emerald-400 border-2 rounded p-2"
                  type='text'
                  placeholder="Enter Name"
                  required={true}
                  value={username}
                  onChange={handleUsernameChange}
                />
                {usernameError && (
                  <span className="flex font-medium tracking-wide text-red-500 text-xs mt-1">
                    {usernameError}
                  </span>
                )}
              </div>

              <input
                className="md:w-96 w-full mt-5 border-emerald-400 outline-emerald-400 border-2 rounded p-2"
                type="email"
                placeholder="Enter E-mail"
                required={true}
                value={email}
                onChange={handleEmailChange}
              />

              <input
                className="md:w-96 w-full mt-5 border-emerald-400 outline-emerald-400 border-2 rounded p-2"
                type="password"
                placeholder="Enter Password"
                required={true}
                value={password}
                onChange={handlePasswordChange}
              />

              <input
                className="md:w-96 w-full mt-5 border-emerald-400 outline-emerald-400 border-2 rounded p-2"
                type="password"
                placeholder="Confirm Password"
                required={true}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />

              <label htmlFor="agree" className="mt-3 flex items-center">
                <input
                  id="agree"
                  type="checkbox"
                  checked={agree}
                  onChange={handleCheckBoxChange}
                  className="rounded border-gray-300 text-emerald-400 shadow-sm focus:border-emerald-400 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-white dark:text-gray-300">
                  I agree to the terms and conditions
                </span>
              </label>

              <button type="submit" disabled={loading} className="text-lg bg-emerald-400 text-white outline-emerald-400 mt-5 md:w-96 w-full p-2 hover:bg-emerald-600 gap-0 rounded">
                {loading ? 'Loading...' : 'Submit Now'}
              </button>
              {error && (
                <p className="text-lg bg-red-400 text-white outline-red-400 mt-5 md:w-96 w-full p-2 hover:bg-red-600 gap-0 rounded">
                  {error}
                </p>
              )}
              <p className="text-sm font-light text-white dark:text-gray-400 mt-5">
                Already have an account?{" "}
                <NavLink to="/logIn">
                  <a href="#" className=" text-primary-800 underline font-bold dark:text-primary-500">Login here</a>
                </NavLink>
              </p>
            </form>
          </div>
        </div>
  </div>
  );
}
