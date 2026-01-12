// client/src/components/TestConfigForm.jsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestConfig, updateTestConfig, resetConfigSuccess } from '../slices/configSlice';

const TestConfigForm = () => {
  const dispatch = useDispatch();
  const { testConfig, loading, error, success } = useSelector((state) => state.config);

  const [durationMinutes, setDurationMinutes] = useState(15);
  const [totalQuestions, setTotalQuestions] = useState(15);
  const [distribution, setDistribution] = useState([]);
  const [formError, setFormError] = useState(null);

  const difficulties = ['easy', 'medium', 'hard'];

  // 1. Fetch config on component mount
  useEffect(() => {
    dispatch(fetchTestConfig());
  }, [dispatch]);

  // 2. Load fetched config into local state
  useEffect(() => {
    if (testConfig) {
      setDurationMinutes(testConfig.durationMinutes);
      setTotalQuestions(testConfig.totalQuestions);
      // Map the distribution array from backend to local state
      const initialDist = difficulties.map(diff => {
        const item = testConfig.difficultyDistribution.find(d => d.difficulty === diff);
        return { 
          difficulty: diff, 
          count: item ? item.count : 0 
        };
      });
      setDistribution(initialDist);
    }
  }, [testConfig]);

  // Handle changes to the difficulty counts
  const handleDistributionChange = (difficulty, count) => {
    const newCount = parseInt(count) || 0;
    setDistribution(prevDist =>
      prevDist.map(item =>
        item.difficulty === difficulty ? { ...item, count: newCount } : item
      )
    );
  };

  // Helper function to calculate the sum of distributed questions
  const getDistributionSum = () => {
    return distribution.reduce((sum, item) => sum + item.count, 0);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setFormError(null);
    dispatch(resetConfigSuccess()); // Clear previous success/error

    const sum = getDistributionSum();

    // Validation 1: Sum of difficulty counts must not exceed totalQuestions
    if (sum > totalQuestions) {
      setFormError(`Total distributed questions (${sum}) exceeds Total Questions (${totalQuestions}). Please adjust.`);
      return;
    }

    // Validation 2: Ensure all difficulty entries are included (even with 0 count)
    const distributionToSend = distribution.map(({ difficulty, count }) => ({
      difficulty,
      count,
    }));

    const configData = {
      durationMinutes,
      totalQuestions,
      difficultyDistribution: distributionToSend,
    };
    
    dispatch(updateTestConfig(configData));
  };

  const sum = getDistributionSum();
  const isSumInvalid = sum > totalQuestions;

  return (
    <div className="p-6 border border-gray-300 rounded-lg shadow-xl bg-white max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-4 border-b pb-2 text-blue-600">
          Test Configuration Settings
      </h3>
      
      {loading && <p className="text-blue-500 text-center">Loading/Saving configuration...</p>}
      {(error || formError) && (
          <p className="text-red-600 bg-red-100 p-3 rounded-md mb-4 border border-red-300">
              Error: {error || formError}
          </p>
      )}
      {success && (
          <p className="text-green-600 bg-green-100 p-3 rounded-md mb-4 border border-green-300">
              Configuration updated successfully!
          </p>
      )}
      
      <form onSubmit={submitHandler}>

        {/* Duration and Total Questions */}
        <div className="flex flex-col sm:flex-row gap-6 mb-6">
          <div className="flex-1">
            <label htmlFor='duration' className="block text-sm font-medium text-gray-700 mb-1">Duration (Minutes)</label>
            <input
              id='duration'
              type='number'
              min='1'
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(parseInt(e.target.value) || 1)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex-1">
            <label htmlFor='total' className="block text-sm font-medium text-gray-700 mb-1">Total Questions in Test</label>
            <input
              id='total'
              type='number'
              min='1'
              value={totalQuestions}
              onChange={(e) => setTotalQuestions(parseInt(e.target.value) || 1)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Difficulty Distribution */}
        <h4 className="text-xl font-semibold mb-3 border-b pb-1">Difficulty Distribution</h4>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          {difficulties.map((diff) => {
            const currentItem = distribution.find(d => d.difficulty === diff);
            return (
              <div key={diff} className="flex-1">
                <label htmlFor={diff} className="block text-sm font-medium text-gray-700 mb-1">
                      {diff.charAt(0).toUpperCase() + diff.slice(1)} Count
                  </label>
                <input
                  id={diff}
                  type='number'
                  min='0'
                  max={totalQuestions} 
                  value={currentItem ? currentItem.count : 0}
                  onChange={(e) => handleDistributionChange(diff, e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            );
          })}
        </div>

        {/* Validation Summary */}
        <div className={`mt-4 p-3 rounded-md font-medium ${isSumInvalid ? 'border-2 border-red-500 bg-red-50 text-red-700' : 'border border-green-500 bg-green-50 text-green-700'}`}>
          <p>Distributed Questions Sum: **{sum}**</p>
          <p>Remaining Questions to be Randomly Chosen: **{Math.max(0, totalQuestions - sum)}**</p>
          {isSumInvalid && <p className="font-bold mt-1">Error: Distributed sum cannot exceed Total Questions!</p>}
        </div>

        <button 
          type='submit' 
          className="py-2 px-4 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition duration-150 shadow-md mt-6 disabled:opacity-50"
          disabled={loading || isSumInvalid}
        >
          Save Test Configuration
        </button>
      </form>
    </div>
  );
};

export default TestConfigForm;