// client/src/pages/QuizScreen.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api'; 
import { getTestQuestions } from '../slices/questionSlice'; 
import { fetchTestConfig } from '../slices/configSlice';

// Helper function to format seconds into MM:SS
const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// Helper: Resolve Image URL
// If the image path is relative (does not start with http/https), 
// prepend the backend base URL (assuming localhost:5000 for local dev).
const resolveImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http') || url.startsWith('data:')) {
    return url;
  }
  // Remove '/api' from the baseURL if it exists to get the root server URL
  const baseUrl = api.defaults.baseURL.replace('/api', ''); 
  return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
};

const QuizScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { 
    testQuestions, 
    testLoading: questionsLoading,
    testError: questionsError    
  } = useSelector((state) => state.question); 
  
  const { testConfig, loading: configLoading } = useSelector((state) => state.config);
  const { userInfo } = useSelector((state) => state.auth);

  // Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { questionId: selectedIndex, ... }
  const [timeLeft, setTimeLeft] = useState(0); // Time in seconds
  const [testActive, setTestActive] = useState(false);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // 1. Initial Data Fetch (Questions and Config)
  useEffect(() => {
    if (!userInfo) {
      navigate('/login'); // Redirect if not logged in
      return;
    }
    dispatch(fetchTestConfig());
    dispatch(getTestQuestions()); 
  }, [dispatch, navigate, userInfo]);
  
  // 2. Set Initial Timer when Config is loaded
  useEffect(() => {
    if (testConfig && testConfig.durationMinutes > 0 && !testActive) {
      setTimeLeft(testConfig.durationMinutes * 60);
    }
  }, [testConfig, testActive]);

  // 3. Handle Option Selection
  const handleSelectOption = (questionId, selectedIndex) => {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: selectedIndex,
    }));
  };

  // 4. Submission Handler (Wrapped in useCallback due to timer dependency)
  const handleSubmit = useCallback(async (isAutoSubmit = false) => {
    if (submissionLoading) return;
    setSubmissionLoading(true);
    setTestActive(false); // Stop the timer

    // Calculate time taken (Total allowed seconds - Time left)
    const totalAllowedSeconds = testConfig?.durationMinutes * 60;
    const timeSpent = Math.max(0, totalAllowedSeconds - timeLeft); // Ensure timeSpent is not negative

    // Prepare answers for backend
    const finalAnswers = testQuestions.map(q => ({
        questionId: q._id,
        // Send -1 if the user did not select an answer for this question
        selectedIndex: userAnswers[q._id] !== undefined ? userAnswers[q._id] : -1, 
    }));
    
    try {
      // Configuration is simple, headers can be sent directly
      const { data } = await api.post('/questions/submit', {
        userAnswers: finalAnswers,
        timeTakenSeconds: timeSpent,
      });
      
      // Navigate to the results screen
      navigate(`/result/${data.resultId}`); 

    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to submit test. Check network or server logs.';
      setSubmitError(errorMsg);
      console.error(err);
    } finally {
      setSubmissionLoading(false);
    }
  }, [userAnswers, timeLeft, testConfig, navigate, testQuestions, submissionLoading]); 

  
  // 5. Timer Logic
  useEffect(() => {
    let timerId;
    if (testActive && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && testActive) {
      // Time is up! Auto-submit
      handleSubmit(true);
    }
    return () => clearInterval(timerId); // Cleanup
  }, [testActive, timeLeft, handleSubmit]); 
  
  // 6. Start Test Button Handler
  const startTest = () => {
    if (testQuestions && testQuestions.length > 0 && testConfig) {
      setTestActive(true);
      setCurrentQuestionIndex(0); // Start from the first question
    }
  };
  
  const currentQuestion = testQuestions ? testQuestions[currentQuestionIndex] : null;
  const totalQuestions = testQuestions ? testQuestions.length : 0;
  
  // --- NEW PROGRESS BAR CALCULATION ---
  // Calculate progress percentage: (Current Index + 1) / Total Questions * 100
  const progressPercentage = totalQuestions > 0 
    ? Math.ceil(((currentQuestionIndex + 1) / totalQuestions) * 100) 
    : 0;

  // --- Rendering Logic ---

  if (configLoading || questionsLoading) {
    return <div className="p-6 text-center text-blue-600 font-medium text-lg">Loading test configuration and questions...</div>;
  }
  
  if (questionsError) {
    return <div className="p-6 text-red-600 text-center font-medium border border-red-300 bg-red-50 mx-auto max-w-xl">Error loading questions: {questionsError}</div>;
  }
  
  // --- Pre-Test View ---
  if (!testActive) {
    return (
      <div className="p-8 max-w-lg mx-auto my-10 text-center bg-white rounded-xl shadow-2xl border-t-4 border-blue-500">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">IQ Test Readiness Check</h2>
        <hr className="mb-6"/>
        <p className="text-lg text-gray-600 mb-2">
          The test consists of <strong className="text-blue-600">{totalQuestions} questions</strong>.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          You have a <strong className="text-red-500">{testConfig?.durationMinutes} minute</strong> time limit.
        </p>
        <p className="text-md text-gray-500 mb-8">
          Your score will be calculated based on difficulty: Easy (1 pt), Medium (3 pts), Hard (6 pts).
        </p>
        <button 
          onClick={startTest}
          disabled={totalQuestions === 0}
          className="py-3 px-8 text-xl bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {totalQuestions > 0 ? 'Start Test' : 'No Questions Available'}
        </button>
      </div>
    );
  }

  // --- Active Test View ---
  return (
    <div className="p-6 max-w-4xl mx-auto my-6 bg-white rounded-xl shadow-xl border border-gray-100">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center text-sm font-medium text-gray-600 mb-1">
          <span>Test Progress</span>
          <span>{currentQuestionIndex + 1} / {totalQuestions}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      {/* End Progress Bar */}
      
      <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-6">
        <span className="text-xl font-semibold text-gray-700">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </span>
        <span 
          className={`text-2xl font-extrabold ${timeLeft <= 60 ? 'text-red-600 animate-pulse' : 'text-green-600'}`}
        >
          Time Left: {formatTime(timeLeft)}
        </span>
      </div>

      {currentQuestion && (
        <div className="mb-8">
          {/* Question Text */}
          <p className="text-xl font-bold text-gray-800 mb-4">{currentQuestion.text}</p>
          
          {/* Question Image */}
          {currentQuestion.imageUrl && (
            <img 
              src={resolveImageUrl(currentQuestion.imageUrl)} 
              alt="Question" 
              className="max-w-full max-h-72 object-contain block mx-auto my-4 border border-gray-300 rounded-lg shadow-md" 
            />
          )}

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {currentQuestion.options.map((option, index) => {
              const isSelected = userAnswers[currentQuestion._id] === index;
              return (
                <div 
                  key={index} 
                  onClick={() => handleSelectOption(currentQuestion._id, index)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition duration-200 shadow-sm
                    ${isSelected 
                      ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-500' 
                      : 'border-gray-300 hover:border-blue-400 bg-white hover:bg-gray-50'}`
                  }
                >
                  <label className="flex items-start cursor-pointer w-full">
                    <input 
                      type='radio' 
                      checked={isSelected} 
                      readOnly // Make readOnly since clicks are handled on the div
                      className="mt-1 mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <div className="flex flex-col w-full">
                      <span className="text-gray-900 font-medium">{option.text}</span>
                      
                      {/* Option Image */}
                      {option.imageUrl && (
                        <img 
                          src={resolveImageUrl(option.imageUrl)} 
                          alt={`Option ${index + 1}`} 
                          className="max-w-full max-h-32 object-contain block mt-3 rounded-md" 
                        />
                      )}
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Status Messages */}
      {submitError && <p className="text-red-600 text-center p-3 bg-red-100 rounded-md my-4">{submitError}</p>}
      {submissionLoading && <p className="text-center text-blue-600 font-medium my-4">Submitting and grading test...</p>}

      {/* Navigation and Submit Buttons */}
      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <button
          onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
          disabled={currentQuestionIndex === 0 || submissionLoading}
          className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &larr; Previous
        </button>

        {currentQuestionIndex < totalQuestions - 1 ? (
          <button
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
            disabled={submissionLoading}
            className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next &rarr;
          </button>
        ) : (
          <button
            onClick={() => handleSubmit(false)}
            disabled={submissionLoading}
            className="py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submissionLoading ? 'Submitting...' : 'Finish Test & Submit'}
          </button>
        )}
      </div>

    </div>
  );
};

export default QuizScreen;