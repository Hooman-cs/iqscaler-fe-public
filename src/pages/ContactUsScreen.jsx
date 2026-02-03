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

      if (response.data.status === 'success') {
        setSuccess('Thank you! We will contact you soon.');
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        setSuccess('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Contact API Error:', error);
      setSuccess('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-700 sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          
          {/* --- LEFT COLUMN: Contact Information --- */}
          <div className="bg-blue-700 text-white p-10 flex flex-col justify-center space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 border-b border-blue-500 pb-2">Get in Touch</h3>
              <p className="text-blue-100 leading-relaxed mb-8">
                Reach out to us for any inquiries about our IQ Scaler platform, business partnerships, or support requests.
              </p>
            </div>

            {/* Address Section */}
            <div className="flex items-start space-x-4">
              <svg className="w-6 h-6 text-blue-300 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <h4 className="font-semibold text-lg text-white">Office Address</h4>
                <p className="text-blue-100 mt-1 text-sm leading-relaxed">
                  B 708, Gurushikhar, Nanakpura, Bilwa, Near Tonk Road<br />
                  Jaipur Rajasthan, 303903
                </p>
              </div>
            </div>

            {/* Business Hours Section */}
            <div className="flex items-start space-x-4">
              <svg className="w-6 h-6 text-blue-300 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-semibold text-lg text-white">Business Hours</h4>
                <p className="text-blue-100 mt-1 text-sm">
                  Monday – Friday<br />
                  09:00 AM – 06:00 PM
                </p>
              </div>
            </div>

            {/* Contact Details Section */}
            <div className="flex items-start space-x-4">
              <svg className="w-6 h-6 text-blue-300 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <h4 className="font-semibold text-lg text-white">Contact Us</h4>
                <div className="mt-1 flex flex-col space-y-1">
                  <a href="mailto:info@jdpcglobal.com" className="text-blue-100 hover:text-white transition-colors text-sm">
                    info@jdpcglobal.com
                  </a>
                  <a href="tel:+919982388838" className="text-blue-100 hover:text-white transition-colors text-sm">
                    +91 99823 88838
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Existing Contact Form --- */}
          <div className="p-10 bg-white">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name Field - Required */}
              <div>
                <label htmlFor="name" className="block mb-1 font-semibold text-gray-700">Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="John Doe"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  disabled={loading} 
                />
              </div>

              {/* Phone Field - Required */}
              <div>
                <label htmlFor="phone" className="block mb-1 font-semibold text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                <input 
                  type="tel" 
                  id="phone" 
                  placeholder="+91 98765 43210"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                  disabled={loading} 
                />
              </div>

              {/* Email Field - Optional */}
              <div>
                <label htmlFor="email" className="block mb-1 font-semibold text-gray-700">Email Address <span className="text-gray-400 font-normal">(Optional)</span></label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="john@example.com"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" 
                  value={formData.email} 
                  onChange={handleChange} 
                  disabled={loading} 
                />
              </div>

              {/* Message Field - Optional */}
              <div>
                <label htmlFor="message" className="block mb-1 font-semibold text-gray-700">Your Message <span className="text-gray-400 font-normal">(Optional)</span></label>
                <textarea 
                  id="message" 
                  rows="4" 
                  placeholder="How can we help you?"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-shadow" 
                  value={formData.message} 
                  onChange={handleChange} 
                  disabled={loading}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full py-3 bg-blue-700 text-white font-bold rounded-md hover:bg-blue-800 transition duration-300 disabled:bg-blue-300 flex justify-center items-center shadow-md"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : 'Send Message'}
              </button>

              {/* Success / Error Message */}
              {success && (
                <div className={`mt-4 text-center p-3 rounded-md text-sm font-medium ${success.includes('wrong') || success.includes('error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {success}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsScreen;





// // client/src/pages/ContactUsScreen.jsx

// import React, { useState } from 'react';
// import axios from 'axios'; // Import standard axios for external API calls

// const ContactUsScreen = () => {
//   const [formData, setFormData] = useState({ 
//     name: '', 
//     phone: '', 
//     email: '', 
//     message: '' 
//   });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(null);

//   const API_URL = 'https://jdpcglobal.com/api/save_contact_us';
//   const API_KEY = 'OPLjdk_sKLEO2MDBBWPT3789S_KLS';

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//     setSuccess(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSuccess(null);

//     // Prepare the payload for the PHP API
//     const payload = {
//       key: API_KEY,
//       name: formData.name,
//       phone: formData.phone,
//       email: formData.email, // Optional in API
//       message: formData.message, // Optional in API
//     };

//     try {
//       // Direct call to external PHP API
//       const response = await axios.post(API_URL, payload);
      
//       // Note: PHP APIs sometimes return status in different formats. 
//       // Assuming it returns success on 200 OK.
//       setSuccess({ type: 'success', message: 'Message sent successfully! We will contact you soon.' });
//       setFormData({ name: '', phone: '', email: '', message: '' });
//     } catch (error) {
//       console.error('Contact API Error:', error);
//       setSuccess({ 
//         type: 'error', 
//         message: 'Unable to connect to the contact service. Please try again later.' 
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const messageClasses = success 
//     ? success.type === 'success' 
//       ? 'bg-green-100 text-green-800 border-green-400' 
//       : 'bg-red-100 text-red-800 border-red-400' 
//     : '';

//   return (
//     <div className="max-w-xl mx-auto my-10 p-6 sm:p-8 bg-white rounded-lg shadow-xl border border-gray-100">
//       <h2 className="text-3xl font-bold text-blue-600 border-b-2 border-gray-200 pb-3 mb-8 text-center">
//         Get In Touch With Our Team
//       </h2>
      
//       {/* Success/Error Message */}
//       {success && (
//         <div className={`p-3 rounded-md mb-6 text-center font-medium border ${messageClasses}`}>
//           {success.message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Name Field */}
//         <div>
//           <label htmlFor="name" className="block mb-1 font-semibold text-gray-700">Full Name</label>
//           <input 
//             type="text" 
//             id="name" 
//             required 
//             placeholder="John Doe"
//             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
//             value={formData.name} 
//             onChange={handleChange} 
//             disabled={loading} 
//           />
//         </div>

//         {/* Phone Field - REQUIRED for this API */}
//         <div>
//           <label htmlFor="phone" className="block mb-1 font-semibold text-gray-700">Phone Number</label>
//           <input 
//             type="tel" 
//             id="phone" 
//             required 
//             placeholder="+1 234 567 890"
//             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
//             value={formData.phone} 
//             onChange={handleChange} 
//             disabled={loading} 
//           />
//         </div>

//         {/* Email Field - Optional as per API */}
//         <div>
//           <label htmlFor="email" className="block mb-1 font-semibold text-gray-700">Email Address (Optional)</label>
//           <input 
//             type="email" 
//             id="email" 
//             placeholder="john@example.com"
//             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
//             value={formData.email} 
//             onChange={handleChange} 
//             disabled={loading} 
//           />
//         </div>

//         {/* Message Field - Optional as per API */}
//         <div>
//           <label htmlFor="message" className="block mb-1 font-semibold text-gray-700">Your Message (Optional)</label>
//           <textarea 
//             id="message" 
//             rows="4" 
//             placeholder="How can we help you?"
//             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-none" 
//             value={formData.message} 
//             onChange={handleChange} 
//             disabled={loading}
//           ></textarea>
//         </div>

//         <button 
//           type="submit" 
//           className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-300" 
//           disabled={loading}
//         >
//           {loading ? 'Sending Request...' : 'Send Message'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ContactUsScreen;