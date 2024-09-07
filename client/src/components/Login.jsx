import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  axios.defaults.withCredentials = true;
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post('http://127.0.0.1:3001/api/auth/login', {
        email,
        password
      });

      // Check if the login was successful
      if (response.data.Login) {
        localStorage.setItem("accessToken", response.data.accessToken)
        navigate('/profile');

      }
    } catch (err) {
      // Handle errors here
      setError('Login failed. Please check your credentials and try again.');
      console.error(err);
    }
  };

  // Function to navigate to the Register page
  const handleRegisterRedirect = () => {
    navigate('/register'); // Redirect to register page
  };

  return (
    <div className='bg-gray-900 min-h-screen flex justify-center items-center pb-14'>
      <form className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md" onSubmit={handleSubmit}>
        <label className="text-4xl mb-8 font-medium text-gray-900 dark:text-blue-200 flex justify-center">Login</label>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <div className="mb-5">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder='Password'
            required
          />
        </div>
        <div className='w-full flex justify-center'>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-2/4 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-4"
          >
            Login
          </button>
        </div>
        <div className="text-center">
          <span className="text-white dark:text-gray-300">Don't have an account?</span>
          <button
            type="button"
            onClick={handleRegisterRedirect}
            className="ml-2 text-blue-500 hover:underline focus:outline-none"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
