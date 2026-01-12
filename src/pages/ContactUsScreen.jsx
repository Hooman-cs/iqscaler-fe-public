// client/src/pages/ContactUsScreen.jsx

import React, { useState } from 'react';
import axios from 'axios'; // Import standard axios for external API calls

const ContactUsScreen = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    email: '', 
    message: '' 
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const API_URL = 'https://jdpcglobal.com/api/save_contact_us';
  const API_KEY = 'OPLjdk_sKLEO2MDBBWPT3789S_KLS';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    // Prepare the payload for the PHP API
    const payload = {
      key: API_KEY,
      name: formData.name,
      phone: formData.phone,
      email: formData.email, // Optional in API
      message: formData.message, // Optional in API
    };

    try {
      // Direct call to external PHP API
      const response = await axios.post(API_URL, payload);
      
      // Note: PHP APIs sometimes return status in different formats. 
      // Assuming it returns success on 200 OK.
      setSuccess({ type: 'success', message: 'Message sent successfully! We will contact you soon.' });
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      console.error('Contact API Error:', error);
      setSuccess({ 
        type: 'error', 
        message: 'Unable to connect to the contact service. Please try again later.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const messageClasses = success 
    ? success.type === 'success' 
      ? 'bg-green-100 text-green-800 border-green-400' 
      : 'bg-red-100 text-red-800 border-red-400' 
    : '';

  return (
    <div className="max-w-xl mx-auto my-10 p-6 sm:p-8 bg-white rounded-lg shadow-xl border border-gray-100">
      <h2 className="text-3xl font-bold text-blue-600 border-b-2 border-gray-200 pb-3 mb-8 text-center">
        Get In Touch With Our Team
      </h2>
      
      {/* Success/Error Message */}
      {success && (
        <div className={`p-3 rounded-md mb-6 text-center font-medium border ${messageClasses}`}>
          {success.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block mb-1 font-semibold text-gray-700">Full Name</label>
          <input 
            type="text" 
            id="name" 
            required 
            placeholder="John Doe"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
            value={formData.name} 
            onChange={handleChange} 
            disabled={loading} 
          />
        </div>

        {/* Phone Field - REQUIRED for this API */}
        <div>
          <label htmlFor="phone" className="block mb-1 font-semibold text-gray-700">Phone Number</label>
          <input 
            type="tel" 
            id="phone" 
            required 
            placeholder="+1 234 567 890"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
            value={formData.phone} 
            onChange={handleChange} 
            disabled={loading} 
          />
        </div>

        {/* Email Field - Optional as per API */}
        <div>
          <label htmlFor="email" className="block mb-1 font-semibold text-gray-700">Email Address (Optional)</label>
          <input 
            type="email" 
            id="email" 
            placeholder="john@example.com"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
            value={formData.email} 
            onChange={handleChange} 
            disabled={loading} 
          />
        </div>

        {/* Message Field - Optional as per API */}
        <div>
          <label htmlFor="message" className="block mb-1 font-semibold text-gray-700">Your Message (Optional)</label>
          <textarea 
            id="message" 
            rows="4" 
            placeholder="How can we help you?"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-none" 
            value={formData.message} 
            onChange={handleChange} 
            disabled={loading}
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-300" 
          disabled={loading}
        >
          {loading ? 'Sending Request...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactUsScreen;