// client/src/pages/ForgotPasswordScreen.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api'; 

const ForgotPasswordScreen = () => {
 // Removed useNavigate as it was unused in the original functional logic
 // const navigate = useNavigate(); 
 const [email, setEmail] = useState('');
 const [loading, setLoading] = useState(false);
 const [message, setMessage] = useState(null);
 const [error, setError] = useState(null);

 const submitHandler = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage(null);
  setError(null);

  try {
   // Send the email to the backend to request a password reset token
   const { data } = await api.post('/users/forgotpassword', { email });
   
   setMessage(data.message);
   
  } catch (err) {
   const errMessage = 
    err.response && err.response.data.message 
     ? err.response.data.message 
     : 'Failed to send reset email. Please check your network connection.';
   setError(errMessage);
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="p-6 max-w-md mx-auto my-10 bg-white rounded-xl shadow-lg border border-gray-100">
   <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Forgot Password</h1>
   <p className="text-center text-gray-600 mb-6">Enter the email address associated with your account. We will send you a password reset link.</p>

   {/* Loading and Status Messages */}
   {loading && <p className="text-center text-blue-600 font-medium my-3">Processing request...</p>}
   
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

    <button 
     type='submit' 
     disabled={loading}
     className="w-full py-3 mt-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
     Request Reset Link
    </button>
   </form>
  </div>
 );
};

export default ForgotPasswordScreen;