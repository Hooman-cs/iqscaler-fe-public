// client/src/pages/LeaderboardPage.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const LeaderboardPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  
  const [leaderboard, setLeaderboard] = useState([]);
  const [myRankData, setMyRankData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setLoading(true);
        // Fetch up to 103 to guarantee 10 full pages of 10 plus the top 3
        const { data: boardData } = await api.get('/results/leaderboard?limit=103');
        setLeaderboard(boardData);

        if (userInfo) {
          const { data: rankData } = await api.get('/results/my-rank');
          setMyRankData(rankData);
        }
      } catch (err) {
        console.error("Failed to fetch leaderboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboardData();
  }, [userInfo]);

  if (loading) return <div className="p-20 text-center animate-pulse text-lg text-gray-500 font-semibold">Loading Global Ranks...</div>;

  // Split Top 3 (Podium) and the rest (Table)
  const top3 = leaderboard.slice(0, 3);
  const others = leaderboard.slice(3);

  // --- CUSTOM PAGINATION LOGIC ---
  let totalPages = 1;
  if (others.length > 7) {
    totalPages = 1 + Math.ceil((others.length - 7) / 10);
  }

  let startIndex = 0;
  let endIndex = 7;

  if (currentPage > 1) {
    startIndex = 7 + (currentPage - 2) * 10;
    endIndex = startIndex + 10;
  }

  const currentOthers = others.slice(startIndex, endIndex);

  const renderPodiumCard = (user, rank) => {
    if (!user) return null;
    const isGold = rank === 1;
    const isSilver = rank === 2;
    
    return (
      <div className={`flex flex-col items-center p-6 rounded-2xl shadow-xl border-b-8 ${
        isGold ? 'bg-yellow-50 border-yellow-400 transform -translate-y-4 scale-105 z-10' : 
        isSilver ? 'bg-gray-50 border-gray-400 z-0' : 'bg-orange-50 border-orange-400 z-0'
      }`}>
        <div className={`text-4xl mb-2 ${isGold ? 'text-yellow-500' : isSilver ? 'text-gray-400' : 'text-orange-500'}`}>
          {isGold ? '🏆' : isSilver ? '🥈' : '🥉'}
        </div>
        <div className="text-xl font-black text-gray-800 mb-1">#{rank}</div>
        <div className="font-bold text-gray-700 text-lg capitalize truncate w-full text-center">{user.username}</div>
        <div className="text-3xl font-black text-blue-600 mt-3">{user.iqScore} <span className="text-sm font-bold text-gray-500">IQ</span></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      <div className="flex-grow pb-12">
        {/* HEADER SECTION */}
        <div className="bg-slate-900 text-white py-12 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Global IQ Leaderboard</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">See how you stack up against the brightest minds around the world. Only verified, certified test results are ranked.</p>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-12">
          
          {/* PODIUM SECTION (Top 3) */}
          {top3.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 items-end mb-16 px-4 md:px-12">
              {renderPodiumCard(top3[1], 2)}
              {renderPodiumCard(top3[0], 1)}
              {renderPodiumCard(top3[2], 3)}
            </div>
          )}

          {/* TABLE SECTION (Ranks 4+) */}
          {others.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
              <table className="min-w-full divide-y divide-gray-200 text-center">
                <thead className="bg-slate-50">
                  <tr>
                    {/* Adjusted padding for mobile (px-3) and desktop (px-6) */}
                    <th className="px-3 sm:px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Rank</th>
                    <th className="px-3 sm:px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-left">User</th>
                    
                    {/* FIX: Date column is hidden on mobile, visible on tablet+ (sm:table-cell) */}
                    <th className="hidden sm:table-cell px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                    
                    <th className="px-3 sm:px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Verified IQ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {currentOthers.map((user, idx) => {
                    const actualRank = startIndex + idx + 4;
                    const isTop10 = actualRank <= 10; 
                    
                    return (
                      <tr 
                        key={user.userId} 
                        className={`${isTop10 ? 'bg-blue-50/50 hover:bg-blue-100/60' : 'bg-white hover:bg-gray-50'} transition duration-150`}
                      >
                        <td className={`px-3 sm:px-6 py-4 font-black ${isTop10 ? 'text-blue-700 text-lg' : 'text-gray-600'}`}>
                          #{actualRank}
                        </td>
                        
                        {/* Aligned left and truncated if name is too long on mobile */}
                        <td className={`px-3 sm:px-6 py-4 capitalize text-left truncate max-w-[100px] sm:max-w-[200px] md:max-w-none ${isTop10 ? 'font-bold text-gray-900' : 'font-semibold text-gray-800'}`}>
                          {user.username}
                        </td>
                        
                        {/* FIX: Date cell matching the header visibility */}
                        <td className={`hidden sm:table-cell px-6 py-4 text-sm ${isTop10 ? 'text-blue-600/80 font-medium' : 'text-gray-500'}`}>
                          {new Date(user.testDate).toLocaleDateString()}
                        </td>
                        
                        <td className={`px-3 sm:px-6 py-4 font-black text-blue-600 ${isTop10 ? 'text-xl' : 'text-lg'}`}>
                          {user.iqScore}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="bg-gray-50 px-4 sm:px-6 py-4 flex justify-between items-center border-t border-gray-200">
                  <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded text-sm font-medium hover:bg-gray-100 disabled:opacity-50 transition">Previous</button>
                  <span className="text-xs sm:text-sm text-gray-600 font-medium">Page {currentPage} of {totalPages}</span>
                  <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded text-sm font-medium hover:bg-gray-100 disabled:opacity-50 transition">Next</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* STICKY BOTTOM UPSELL BANNER */}
      {userInfo && myRankData && (
        <div className="sticky bottom-0 w-full bg-white border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-40 p-4 mt-auto">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            
            {!myRankData.hasTakenTest ? (
              <p className="text-gray-700 font-medium text-center md:text-left">
                You haven't taken the test yet! Find out your IQ and join the leaderboard.
              </p>
            ) : myRankData.certificatePurchased ? (
              <div className="flex items-center gap-3">
                <div className="bg-green-100 text-green-700 p-3 rounded-full text-xl">✅</div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wide">Your Verified Status</p>
                  <p className="text-lg text-gray-800 font-medium">Ranked <span className="font-black text-blue-600">#{myRankData.rank}</span> with an IQ of <span className="font-black text-blue-600">{myRankData.bestIqScore}</span>.</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-center gap-3 text-center md:text-left w-full justify-between">
                <div>
                  <p className="text-sm text-orange-500 font-bold uppercase tracking-wide">Action Required</p>
                  <p className="text-gray-800 font-medium text-sm md:text-base">
                    You have a pending score! Purchase your certificate to claim the <span className="font-black text-blue-600">#{myRankData.rank}</span> spot.
                  </p>
                </div>
                <Link to="/history" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg shadow transition whitespace-nowrap">
                  Unlock My Rank
                </Link>
              </div>
            )}

            {!myRankData.hasTakenTest && (
              <Link to="/quiz" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow transition">
                Start Test Now
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardPage;