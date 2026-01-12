// client/src/pages/ResetPasswordScreen.jsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api'; 

const ResetPasswordScreen = () => {
 const { resettoken } = useParams(); // Get the token from the URL path
 const navigate = useNavigate();

 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [loading, setLoading] = useState(false);
 const [message, setMessage] = useState(null);
 const [error, setError] = useState(null);

 const submitHandler = async (e) => {
  e.preventDefault();
  
  if (password !== confirmPassword) {
   setError('Passwords do not match.');
   return;
  }
  
  setLoading(true);
  setMessage(null);
  setError(null);

  try {
   // Send the new password and the token to the backend
   const { data } = await api.put(`/users/resetpassword/${resettoken}`, { password });
   
   setMessage(data.message);
   // Optional: Navigate to login after a short delay
   setTimeout(() => navigate('/login'), 3000);
   
  } catch (err) {
   const errMessage = 
    err.response && err.response.data.message 
     ? err.response.data.message 
     : 'Password reset failed. Invalid or expired token.';
   setError(errMessage);
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="p-6 max-w-md mx-auto my-10 bg-white rounded-xl shadow-lg border border-gray-100">
   <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Reset Password</h1>
   <p className="text-center text-gray-600 mb-6">Enter your new password below.</p>

   {/* Loading and Status Messages */}
   {loading && <p className="text-center text-blue-600 font-medium mb-4">Processing request...</p>}
   {error && (
    <p className="text-red-700 bg-red-100 border border-red-400 p-3 rounded-md mb-4 text-center font-medium">
    Error: {error}
    </p>
   )}
   {message && (
    <p className="text-green-700 bg-green-100 border border-green-400 p-3 rounded-md mb-4 text-center font-medium">
    Success: {message}
    </p>
   )}

   <form onSubmit={submitHandler} className="space-y-4">
    <div>
     <label htmlFor='password' className="block text-gray-700 font-medium mb-1">New Password</label>
     <input
      id='password'
      type='password'
      placeholder='Enter new password'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
     />
    </div>
    
    <div>
     <label htmlFor='confirmPassword' className="block text-gray-700 font-medium mb-1">Confirm Password</label>
     <input
      id='confirmPassword'
      type='password'
      placeholder='Confirm new password'
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      required
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
     />
    </div>

    <button 
     type='submit' 
     disabled={loading}
     className="w-full py-3 mt-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
     Reset Password
    </button>
   </form>
  </div>
 );
};

export default ResetPasswordScreen;