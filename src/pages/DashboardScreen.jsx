// client/src/pages/DashboardScreen.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listMyResults } from '../slices/resultSlice';

const DashboardScreen = () => {
  const dispatch = useDispatch();
  
  const { userInfo } = useSelector((state) => state.auth);
  const { myResults, loading, error } = useSelector((state) => state.result);

  useEffect(() => {
    // Fetch the list of results to show the latest one
    dispatch(listMyResults());
  }, [dispatch]);

  // The state structure indicates that results are likely returned sorted by latest first.
  const latestResult = myResults.length > 0 ? myResults[0] : null;

  const calculatePercentage = (correct, total) => {
      return total > 0 ? ((correct / total) * 100).toFixed(1) : 0;
  };

  // Removed the 'styles' object and inline styles.

  if (loading) return <div className="p-5 text-center text-blue-600 font-medium">Loading dashboard...</div>;
  if (error) return <div className="p-5 text-red-600 text-center font-medium border border-red-300 bg-red-50 mx-auto max-w-lg">Error loading data: {error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto my-6 bg-white rounded-xl shadow-xl border border-gray-100">
      
      {/* Welcome Header */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 border-b-2 border-gray-200 pb-4 mb-8">
        Welcome back, {userInfo.username}!
      </h1>

      {/* Action Cards: Start Test and History */}
      <div className="flex flex-col sm:flex-row gap-5 justify-between mb-10">
        
        {/* Start New Test Card */}
        <Link 
          to='/quiz' 
          className="flex-1 p-6 rounded-lg text-center text-white bg-green-600 hover:bg-green-700 transition duration-300 shadow-md transform hover:scale-[1.02] cursor-pointer"
        >
          <h2 className="text-2xl font-bold">Start a New Test</h2>
          <p className="mt-1 text-sm opacity-90">Jump right back in!</p>
        </Link>
        
        {/* View History Card */}
        <Link 
          to='/history' 
          className="flex-1 p-6 rounded-lg text-center text-white bg-blue-600 hover:bg-blue-700 transition duration-300 shadow-md transform hover:scale-[1.02] cursor-pointer"
        >
          <h2 className="text-2xl font-bold">View All History</h2>
          <p className="mt-1 text-sm opacity-90">Review your past scores.</p>
        </Link>
      </div>

      {/* Latest Result Summary */}
      <div className="mt-10 pt-6 border-t border-gray-300">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Latest Performance Summary</h3>
        
        {latestResult ? (
          <div className="p-6 border-2 border-blue-500 rounded-lg text-center bg-blue-50 shadow-inner">
            <p className="text-lg mb-2 text-gray-600">
              Test Taken On: <strong className="text-gray-800">{new Date(latestResult.createdAt).toLocaleDateString()}</strong>
            </p>
            <p className="text-5xl font-extrabold text-green-700 my-3">
              Score: {latestResult.totalScore}
            </p>
            <p className="text-xl text-gray-700 mb-4">
              Correct: {latestResult.correctAnswers} / {latestResult.questionsAttempted} ({calculatePercentage(latestResult.correctAnswers, latestResult.questionsAttempted)}%)
            </p>
            <Link 
              to={`/result/${latestResult._id}`} 
              className="text-blue-600 hover:text-blue-800 font-bold mt-2 inline-block transition duration-200"
            >
              View Full Details &rarr;
            </Link>
          </div>
        ) : (
          <div className="text-center p-6 border-2 border-dashed border-gray-400 rounded-lg text-gray-600 bg-gray-50">
            <p className="text-lg">
              No completed tests found. Start your first test now!
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default DashboardScreen;