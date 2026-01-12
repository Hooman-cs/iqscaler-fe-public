// client/src/pages/HistoryScreen.jsx
 
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listMyResults } from '../slices/resultSlice';
import api from '../utils/api';

const HistoryScreen = () => {
  const dispatch = useDispatch();
  
  // Use 'myResults' state from resultSlice
  const { myResults, loading, error } = useSelector((state) => state.result);

  useEffect(() => {
    // Fetch the list of results for the logged-in user
    dispatch(listMyResults());
  }, [dispatch]);

  const calculatePercentage = (correct, total) => {
    return total > 0 ? ((correct / total) * 100).toFixed(1) : 0;
  };

  const handleDownloadCertificate = async (resultId) => {
    try {
      // Use the authenticated API instance (api.js)
      const response = await api.get(`/certificates/${resultId}`, {
        responseType: 'blob', // Handle binary data
      });

      // Client-side file download logic
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Certificate-${resultId}.pdf`); 
      
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url); 

    } catch (error) {
      console.error('Certificate Download Failed:', error);
      // Display a more professional error to the user
      alert('Failed to download certificate. Please ensure the certificate was purchased and try again.');
    }
  };

  if (loading) return <div className="p-6 text-center text-blue-600 font-medium">Loading history...</div>;
  if (error) return <div className="p-6 text-red-600 text-center font-medium border border-red-300 bg-red-50 mx-auto max-w-lg">Error loading history: {error}</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto my-6 bg-white rounded-xl shadow-xl border border-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-200 pb-3 mb-6">
        My Quiz History
      </h1>

      {myResults.length === 0 ? (
        <div className="text-center mt-10 p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <p className="text-xl text-gray-700 mb-6">You have not completed any quizzes yet.</p>
          <Link 
            to='/quiz' 
            className="inline-block py-3 px-6 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-150"
          >
            Start a Test
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Correct (%)</th>
                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Details</th>
                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Certificate</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {myResults.map((result) => (
                <tr key={result._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(result.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-lg font-bold text-blue-600">
                    {result.totalScore}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700">
                    {result.correctAnswers} / {result.questionsAttempted} ({calculatePercentage(result.correctAnswers, result.questionsAttempted)}%)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <Link 
                      to={`/result/${result._id}`} 
                      className="text-blue-600 hover:text-blue-800 font-semibold transition duration-150"
                    >
                      View
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    {result.certificatePurchased ? (
                      <button
                        onClick={() => handleDownloadCertificate(result._id)}
                        className="text-green-600 hover:text-green-800 font-semibold transition duration-150 cursor-pointer p-1 rounded-md border border-transparent hover:border-green-600"
                        title="Download Certificate"
                      >
                        Download
                      </button>
                    ) : (
                      <Link 
                        to={`/result/${result._id}`} 
                        className="text-yellow-600 hover:text-yellow-800 font-semibold transition duration-150"
                      >
                        Purchase
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistoryScreen;