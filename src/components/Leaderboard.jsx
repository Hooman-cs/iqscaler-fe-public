// client/src/components/Leaderboard.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { FaTrophy } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Leaderboard = () => {
    // FIXED: Selecting from 'state.result' to properly grab the data Redux is fetching!
    const resultState = useSelector((state) => state.result || state.leaderboard) || {};
    const { leaderboard = [], loading = false, error: leaderboardError = null } = resultState;

    if (loading) {
        return (
            <div className="flex justify-center items-center h-48 bg-white rounded-2xl shadow-xl border border-gray-100">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }
    
    if (leaderboardError) {
        return (
            <div className="bg-red-50 text-red-600 p-6 text-center rounded-2xl border border-red-200 shadow-lg">
                <p className="font-bold">Leaderboard Unavailable</p>
                <p className="text-sm">{leaderboardError}</p>
            </div>
        );
    }
    
    if (leaderboard.length === 0) {
        return (
            <div className="text-center p-8 text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <p className="italic">Be the first to join the leaderboard!</p>
            </div>
        );
    }

    // Only slice top 5 for the homepage widget
    const top5 = leaderboard.slice(0, 5);

    return (
        <div className="bg-white p-4 md:p-8 rounded-2xl shadow-xl border-t-8 border-blue-600">
            <h3 className="text-xl md:text-3xl font-black text-center text-gray-800 mb-6 flex items-center justify-center uppercase tracking-tighter">
                <FaTrophy className="text-yellow-500 mr-2 md:mr-3 text-2xl md:text-4xl drop-shadow-sm"/> 
                Hall of Fame
            </h3>
            
            {/* NEW: Tabular Format */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 mb-2">
                <table className="min-w-full divide-y divide-gray-200 text-center">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-3 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Rank</th>
                            <th className="px-3 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-left">User</th>
                            <th className="px-3 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">IQ Score</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {top5.map((user, index) => {
                            const rank = index + 1;
                            let rankStyle = "text-gray-600 font-bold";
                            let bgStyle = "hover:bg-blue-50 transition";
                            
                            if (rank === 1) { 
                                rankStyle = "text-yellow-600 font-black text-lg"; 
                                bgStyle = "bg-yellow-50 hover:bg-yellow-100"; 
                            } else if (rank === 2) { 
                                rankStyle = "text-gray-400 font-black text-lg"; 
                                bgStyle = "bg-gray-50 hover:bg-gray-100"; 
                            } else if (rank === 3) { 
                                rankStyle = "text-orange-500 font-black text-lg"; 
                                bgStyle = "bg-orange-50 hover:bg-orange-100"; 
                            }

                            return (
                                <tr key={user.userId || index} className={bgStyle}>
                                    <td className={`px-3 py-3 ${rankStyle}`}>#{rank}</td>
                                    <td className="px-3 py-3 font-semibold text-gray-800 capitalize text-left truncate max-w-[120px]">
                                        {user.username || 'Anonymous'}
                                    </td>
                                    <td className={`px-3 py-3 font-black ${rank <= 3 ? rankStyle : 'text-blue-600 text-lg'}`}>
                                        {user.iqScore}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            
            <div className="mt-4 text-center">
                <Link to="/leaderboard" className="text-blue-600 hover:text-blue-800 font-bold transition duration-150 inline-flex items-center">
                    View Full Leaderboard <span className="ml-1">&rarr;</span>
                </Link>
            </div>
        </div>
    );
};

export default Leaderboard;