import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      navigate('/profile')
    }
  }, [])

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post('http://127.0.0.1:3001/api/auth/register', {
        name,
        email,
        password
      });

      // Check if the registration was successful
      if (response.data) {
        toast.success("Registration success")
        setTimeout(() => {
          navigate('/login'); // Redirect to login page
        }, 1000)
      }
    } catch (err) {
      // Handle errors here
      setError('Registration failed. Please try again.');
      console.error(err);
    }
  };

  // Function to navigate to the Sign In page
  const handleSignInRedirect = () => {
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className='bg-gray-900 min-h-screen flex justify-center items-center pb-14'>
      <form className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md" onSubmit={handleSubmit}>
        <label className="text-4xl mb-8 font-medium text-gray-900 dark:text-blue-200 flex justify-center">Register</label>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        {/* {error && toast.error(error)} */}
        <div className="mb-5">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Name"
            required
          />
        </div>
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
            Register
          </button>
        </div>
        <div className="text-center">
          <span className="text-white dark:text-gray-300">Already have an account?</span>
          <button
            type="button"
            onClick={handleSignInRedirect}
            className="ml-2 text-blue-500 hover:underline focus:outline-none"
          >
            Sign In
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
