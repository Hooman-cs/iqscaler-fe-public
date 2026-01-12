import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; 
// 1. Import the Google components and the new thunk
import { GoogleLogin } from '@react-oauth/google';
import { authUser, googleLogin } from '../slices/authSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/'); 
    }
  }, [navigate, userInfo]);

  // Existing handler for standard Email/Password login
  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await dispatch(authUser({ email, password })).unwrap(); 
      navigate('/');
    } catch (err) {
      setError(err || 'Login failed.'); 
    }
  };

  // --- NEW CODE STARTS HERE ---
  // This function handles the success response from Google
  const googleSuccess = async (response) => {
    try {
      // response.credential is the JWT (ID Token) sent back by Google
      await dispatch(googleLogin(response.credential)).unwrap();
      navigate('/');
    } catch (err) {
      setError(err || 'Google Login Failed');
    }
  };
  // --- NEW CODE ENDS HERE ---

  return (
    <div className="p-6 max-w-md mx-auto my-10 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign In</h1>
      
      {message && (
        <p className="text-red-700 bg-red-100 border border-red-400 p-3 rounded-md mb-4 text-center text-sm font-medium">
          {message}
        </p>
      )}

      <form onSubmit={submitHandler} className="flex flex-col space-y-4">
        <div>
          <label htmlFor='email' className="block text-gray-700 font-medium mb-1">Email Address</label>
          <input
            id='email'
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
          />
        </div>

        <div>
          <label htmlFor='password' className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            id='password'
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
          />
        </div>

        <button 
          type='submit' 
          className="w-full py-3 mt-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Sign In
        </button>
      </form>

      {/* --- NEW UI SECTION FOR GOOGLE LOGIN --- */}
      <div className="my-6 flex items-center before:flex-1 before:border-t before:border-gray-200 after:flex-1 after:border-t after:border-gray-200">
        <p className="mx-4 text-center font-semibold text-gray-400 text-xs uppercase tracking-wider">OR</p>
      </div>

      <div className="flex justify-center">
        <GoogleLogin 
          onSuccess={googleSuccess} 
          onError={() => setError('Google Authentication Failed')} 
          useOneTap // Optional: shows a small popup for easier login
        />
      </div>
      {/* --- END NEW UI SECTION --- */}

      <div className="mt-6 text-center space-y-2">
        <Link to='/forgotpassword' name="forgot" className="block text-blue-600 hover:text-blue-800 transition duration-150 text-sm">
          Forgot Password?
        </Link>
        <Link to='/register' className="block text-gray-500 hover:text-gray-700 transition duration-150 text-sm font-medium">
          Don't have an account? <span className="text-blue-600">Register</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginScreen;