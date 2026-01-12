// client/src/pages/FAQScreen.jsx
 
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for the Contact Us link

const FAQScreen = () => {

const faqItems = [
 { 
 question: 'Is the test scientifically valid?', 
 answer: 'Yes. Our assessments follow established psychometric principles and cognitive testing frameworks, enabling consistent and reliable estimation of intelligence indicators.' 
 },
 { 
 question: 'How long does the test take?', 
 answer: 'Most users complete the assessment within 10–20 minutes, depending on pace and focus.' 
 },
 { 
 question: 'Is the test suitable for all ages?', 
 answer: 'It is designed primarily for teens and adults (ages 14+). Younger children may require age-appropriate testing solutions.' 
 },
 { 
 question: 'Can I retake the test?', 
 answer: 'Absolutely. Retesting can help track improvements or compare different cognitive states over time.' 
 },
 { 
 question: 'Will my data remain private?', 
 answer: 'Yes — we follow strict data protection protocols, ensuring your results remain confidential. We do not share your information with third parties.' 
 },
    // New Questions Added
    { 
    question: 'How do I access my test results?', 
    answer: 'Results are typically available immediately upon completion of the test and can be viewed in your user dashboard under "Test History."' 
    },
    { 
    question: 'Are there different test difficulty levels?', 
    answer: 'The test dynamically adjusts difficulty based on your performance to ensure an accurate measure of your ability across various cognitive domains.' 
    },
];

return (
 <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 leading-relaxed">
 {/* Heading */}
 <h2 className="text-3xl md:text-4xl text-blue-600 border-b-2 border-gray-200 pb-3 mb-8 font-bold text-center">
  Frequently Asked Questions (FAQ)
 </h2>
 
 {/* FAQ List */}
 {faqItems.map((item, index) => (
  <div 
   key={index} 
   // Add 'group' class to the container
   className="bg-gray-50 p-5 rounded-lg mb-4 border-l-4 border-blue-600 shadow-md transition duration-300 hover:shadow-lg cursor-pointer group"
  >
  {/* Question */}
  <p className="font-semibold text-lg text-gray-800 mb-2 flex justify-between items-center">
   <span>{item.question}</span>
    {/* Optional: Add a subtle arrow icon that rotates on hover */}
    <svg className="w-5 h-5 text-blue-600 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  </p>
  {/* Answer - Hidden by default, shown on group-hover */}
  <p className="text-gray-600 text-base transition-all duration-500 max-h-0 group-hover:max-h-40 overflow-hidden opacity-0 group-hover:opacity-100 group-hover:pt-2">
   {item.answer}
  </p>
  </div>
 ))}

    {/* Contact Us Link */}
    <div className="mt-10 text-center p-6 bg-blue-50 rounded-lg shadow-inner">
        <p className="text-xl text-gray-700 font-medium mb-3">
            Still have questions?
        </p>
        <Link 
            to="/contact" 
            className="inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
            Contact Our Support Team
        </Link>
    </div>
 </div>
);
};

export default FAQScreen;