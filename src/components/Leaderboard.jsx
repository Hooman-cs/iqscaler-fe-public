// client/src/components/Leaderboard.jsx

import React from 'react';
import { useSelector } from 'react-redux';
import { FaTrophy, FaCalendarAlt } from 'react-icons/fa';

const RankCard = ({ rank, user }) => {
    const { username, maxScore, testDate } = user; 
    
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        
        // Responsive date formatting
        const isMobile = window.innerWidth < 640;
        const options = isMobile 
            ? { month: 'short', day: 'numeric', year: '2-digit' } 
            : { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
            
        return date.toLocaleDateString(undefined, options);
    };

    let rankColor = 'text-gray-600';
    let trophyColor = 'text-gray-400';
    let cardStyle = 'bg-white border-gray-200';

    if (rank === 1) {
        rankColor = 'text-yellow-600';
        trophyColor = 'text-yellow-500';
        cardStyle = 'bg-yellow-50 border-yellow-300 shadow-lg sm:scale-[1.03] z-10'; // Scale only on sm+ screens
    } else if (rank === 2) {
        rankColor = 'text-gray-500';
        trophyColor = 'text-gray-500';
        cardStyle = 'bg-gray-100 border-gray-300 shadow-md';
    } else if (rank === 3) {
        rankColor = 'text-orange-500';
        trophyColor = 'text-orange-400';
        cardStyle = 'bg-orange-50 border-orange-300 shadow-sm';
    }
    
    return (
        <div className={`flex items-center p-3 md:p-4 mb-3 rounded-lg border-2 transition-all duration-300 ${cardStyle}`}>
            
            {/* 1. Rank & Trophy - Smaller on mobile */}
            <div className={`text-xl md:text-3xl font-extrabold mr-2 md:mr-4 w-6 md:w-10 flex-shrink-0 ${rankColor}`}>
                {rank}
            </div>
            <FaTrophy className={`text-lg md:text-2xl mr-3 md:mr-4 ${trophyColor} flex-shrink-0`} />

            {/* 2. User Details - min-w-0 allows the truncate to work */}
            <div className="flex-grow min-w-0">
                <p className="text-sm md:text-lg font-bold text-gray-800 truncate uppercase tracking-tight">
                    {username}
                </p>
                <p className="text-[10px] md:text-sm text-gray-500 flex items-center mt-1">
                    <FaCalendarAlt className="mr-1 flex-shrink-0" />
                    <span className="truncate">{formatDate(testDate)}</span>
                </p>
            </div>

            {/* 3. Score - Compact on mobile */}
            <div className="flex-shrink-0 text-right ml-2">
                <p className="text-xl md:text-2xl font-black text-green-600 leading-none">
                    {Math.floor(maxScore)}
                </p>
                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase">IQ</p>
            </div>
        </div>
    );
};

const Leaderboard = () => {
    const { leaderboard, leaderboardLoading, leaderboardError } = useSelector(
        (state) => state.result
    );

    if (leaderboardLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="text-blue-600 font-medium animate-pulse">Calculating Rankings...</p>
            </div>
        );
    }

    if (leaderboardError) {
        return (
            <div className="text-center p-4 md:p-6 text-red-600 bg-red-50 border border-red-200 rounded-lg">
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

    return (
        <div className="bg-white p-4 md:p-8 rounded-2xl shadow-xl border-t-8 border-blue-600">
            <h3 className="text-xl md:text-3xl font-black text-center text-gray-800 mb-8 flex items-center justify-center uppercase tracking-tighter">
                <FaTrophy className="text-yellow-500 mr-2 md:mr-3 text-2xl md:text-4xl drop-shadow-sm"/> 
                Hall of Fame
            </h3>

            <div className="space-y-1">
                {leaderboard.map((user, index) => (
                    <RankCard key={user.userId || index} rank={index + 1} user={user} /> 
                ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-center text-[10px] md:text-xs text-gray-400 leading-relaxed uppercase font-semibold tracking-widest">
                    Highest verified score per user
                </p>
            </div>
        </div>
    );
};

export default Leaderboard;