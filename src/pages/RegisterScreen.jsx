// client/src/pages/RegisterScreen.jsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google'; // Import Google Component
import { registerUser, googleLogin } from '../slices/authSlice'; // Import thunks

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await dispatch(registerUser({ username, email, password })).unwrap(); 
      navigate('/');
    } catch (err) {
      setError(err || 'Registration failed.');
    }
  };

  // Google Sign-Up Handler (Uses same logic as Login)
  const googleSuccess = async (response) => {
    try {
      await dispatch(googleLogin(response.credential)).unwrap();
      navigate('/');
    } catch (err) {
      setError(err || 'Google Registration Failed');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto my-10 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h1>
      
      {message && (
        <p className="text-red-700 bg-red-100 border border-red-400 p-3 rounded-md mb-4 text-center text-sm">
          {message}
        </p>
      )}

      {/* Google Sign Up Button */}
      <div className="flex justify-center mb-6">
        <GoogleLogin 
          onSuccess={googleSuccess} 
          onError={() => setError('Google Registration Failed')} 
          text="signup_with"
          shape="pill"
        />
      </div>

      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase">Or fill details</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <form onSubmit={submitHandler} className="flex flex-col space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Username</label>
          <input
            type='text'
            placeholder='Choose a username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Email Address</label>
          <input
            type='email'
            placeholder='email@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            type='password'
            placeholder='••••••••'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
          <input
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <button type='submit' className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
          Register
        </button>
      </form>
      
      <div className="mt-4 text-center text-sm">
        <p className="text-gray-500">
          Already have an account? <Link to='/login' className="text-blue-600 font-bold">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterScreen;