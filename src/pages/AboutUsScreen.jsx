// client/src/pages/AboutUsScreen.jsx

import React from 'react';

const AboutUsScreen = () => {
// The original 'styles' object has been removed and replaced by Tailwind classes below.

const steps = [
 { title: '1. Start the Assessment', description: 'Begin with a structured sequence of questions designed to measure various cognitive functions. Each question type is carefully selected for scientific validity.' },
 { title: '2. Timed, Guided Experience', description: 'You\'ll move through timed sections with clear instructions, ensuring fairness and consistency across all participants. The interface minimizes distractions.' },
 { title: '3. Intelligent Scoring', description: 'Our adaptive scoring engine uses difficulty-weighted scoring and cognitive domain mapping to produce a balanced and accurate IQ estimate.' },
 { title: '4. Detailed Report Delivery', description: 'Within seconds, you\'ll receive a full report outlining your IQ score, percentile comparison, cognitive domain performance, and suggestions for improvement.' },
];

const cognitiveAreas = [
 { title: 'Logical Reasoning', description: 'How well you identify relationships, draw conclusions, and solve abstract problems.' },
 { title: 'Numerical Processing', description: 'Your ability to analyze numerical patterns and perform mental calculations with accuracy.' },
 { title: 'Verbal Comprehension', description: 'Understanding language-based information, analogies, and conceptual relationships.' },
 { title: 'Spatial Reasoning', description: 'How effectively you interpret shapes, patterns, and visual structures.' },
 { title: 'Working Memory', description: 'Your ability to retain and manipulate information under time constraints.' },
];

return (
 <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 leading-relaxed text-gray-700">
 <h2 className="text-4xl font-extrabold text-blue-600 border-b-2 border-gray-200 pb-4 mb-10 text-center">
  About Our Platform: Science, Structure & Purpose
 </h2>
 
 {/* Our Purpose */}
 <section className="mb-12 p-6 bg-white rounded-xl shadow-lg">
  <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-100 pb-3 mb-6">
  Our Purpose: Clarity in Cognitive Measurement
  </h3>
  <p className="mb-4">
  We believe cognitive assessment should be <b>accessible, understandable, and grounded in real science</b>. Traditional IQ tests are often outdated, difficult to interpret, or locked behind inaccessible formats. Our platform modernizes that experience by offering scientifically structured assessments supported by a smooth digital interface.
  </p>
  <p>
  Our mission is to bring clarity to cognitive measurement — helping you understand <b>how you think</b>, not just what your score is. Whether you’re evaluating your abilities out of curiosity, preparing for academic challenges, or seeking data for self-development, we aim to provide accurate insights that empower informed decision-making.
  </p>
 </section>

 {/* Scientific Foundations */}
 <section className="mb-12 p-6 bg-white rounded-xl shadow-lg">
  <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-100 pb-3 mb-6">
  Scientific Foundations
  </h3>
  <p className="mb-4">Our test structure is rigorously built around principles from:</p>
  <ul className="list-disc pl-6 space-y-3 mb-6">
  <li className="text-lg"><b>Cognitive Psychology:</b> Understanding how individuals process information, solve problems, and interpret patterns.</li>
  <li className="text-lg"><b>Psychometrics:</b> Ensuring that every question contributes to fair, statistically consistent scoring.</li>
  <li className="text-lg"><b>Standardized Assessment Design:</b> Balancing the difficulty and structure of questions for accurate measurement of intelligence indicators.</li>
  </ul>
  <p>
  Each test undergoes regular review and refinement to ensure consistency, reliability, and alignment with contemporary testing standards.
  </p>
 </section>

 {/* What We Measure */}
 <section className="mb-12 p-6 bg-white rounded-xl shadow-lg">
  <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-100 pb-3 mb-6">
  What We Measure: Core Cognitive Areas
  </h3>
  <p className="mb-6">Our IQ test aims to evaluate multiple core cognitive areas:</p>
  
  {/* Responsive Grid for Cognitive Domains (Improvement) */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {cognitiveAreas.map((area, index) => (
   <div 
    key={index} 
    className="bg-green-50 p-5 rounded-lg border-l-4 border-blue-600 shadow-sm transition duration-300 hover:shadow-md"
   >
   <p className="font-bold text-lg text-blue-700 mb-1">
    {area.title}
   </p>
   <p className="text-sm text-gray-600">
    {area.description}
   </p>
   </div>
  ))}
  </div>
  
  <p className="mt-6">
  These domains together form a holistic view of your cognitive strengths, providing a comprehensive profile rather than just a single number.
  </p>
 </section>

 {/* How It Works / Step-by-Step Process */}
 <section className="mb-12 p-6 bg-white rounded-xl shadow-lg">
  <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-100 pb-3 mb-6">
  How It Works: Step-by-Step Assessment
  </h3>
  {/* Responsive Grid for Steps (Original logic preserved) */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
  {steps.map((step, index) => (
   <div 
    key={index} 
    className="bg-gray-50 p-5 rounded-lg border-l-4 border-green-600 shadow-md transition duration-300 hover:shadow-lg"
   >
   <p className="font-bold text-xl text-green-700 mb-2">
    {step.title}
   </p>
   <p className="text-gray-600 text-base">
    {step.description}
   </p>
   </div>
  ))}
  </div>
 </section>
 </div>
);
};

export default AboutUsScreen;