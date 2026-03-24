// client/src/components/Header.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import logo from "../assets/images/IQlogo.webp";

// Imported clean icons for the sub-navbar
import {
  FaPlay,
  FaChartPie,
  FaHistory,
  FaReceipt,
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      {/* --- MAIN NAVBAR (FIXED) --- */}
      <header className="fixed w-full z-50 top-0 left-0 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 md:h-20 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <img
                  className="h-10 md:h-14 w-auto drop-shadow-sm transition-transform hover:scale-105"
                  src={logo}
                  alt="IQ Scaler Logo"
                />
              </Link>
            </div>

            {/* Desktop Navigation (Main) */}
            <nav className="hidden md:flex space-x-8 items-center">
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-600 font-medium transition duration-200"
              >
                Home
              </Link>
              <Link
                to="/faq"
                className="text-gray-600 hover:text-blue-600 font-medium transition duration-200"
              >
                FAQ
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-blue-600 font-medium transition duration-200"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-blue-600 font-medium transition duration-200"
              >
                Contact
              </Link>
              <Link
                to="/leaderboard"
                className="text-blue-600 hover:text-blue-800 font-bold transition duration-200 flex items-center"
              >
                <span className="mr-1">🏆</span> Leaderboard
              </Link>
            </nav>

            {/* Desktop Auth / Welcome Text */}
            <div className="hidden md:flex items-center space-x-4">
              {!userInfo ? (
                <>
                  <Link
                    to="/login"
                    className="text-gray-600 font-medium hover:text-blue-600 transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-50 text-blue-600 px-5 py-2 rounded-lg font-bold hover:bg-blue-100 border border-blue-200 transition"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/quiz"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 shadow-md transition duration-200"
                  >
                    Start Test
                  </Link>
                </>
              ) : (
                <div className="text-gray-800 font-bold bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                  Welcome, {userInfo.username}
                </div>
              )}
            </div>

            {/* Mobile menu button & Welcome */}
            <div className="md:hidden flex items-center space-x-3">
              {userInfo && (
                <span className="text-gray-800 font-bold text-sm truncate max-w-[120px]">
                  Hi, {userInfo.username}
                </span>
              )}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-blue-600 focus:outline-none p-1"
              >
                <svg
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-xl border-t border-gray-100 absolute w-full max-h-[calc(100vh-64px)] overflow-y-auto">
            <div className="px-4 pt-2 pb-6 space-y-3 flex flex-col">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 font-medium py-2 border-b border-gray-100"
              >
                Home
              </Link>
              <Link
                to="/leaderboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-blue-600 font-bold py-2 border-b border-gray-100"
              >
                🏆 Leaderboard
              </Link>
              <Link
                to="/faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 font-medium py-2 border-b border-gray-100"
              >
                FAQ
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 font-medium py-2 border-b border-gray-100"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 font-medium py-2 border-b border-gray-100"
              >
                Contact Us
              </Link>

              {!userInfo && (
                <div className="flex flex-col space-y-2 mt-4">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-center text-gray-700 font-bold py-2 border border-gray-300 rounded-lg"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-center bg-blue-50 text-blue-600 font-bold py-2 border border-blue-200 rounded-lg"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              <Link
                to="/quiz"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-blue-600 text-white text-center py-3 rounded-lg font-bold shadow-md mt-4"
              >
                Start Test
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* --- SUB NAVBAR (ABSOLUTE: Scrolls away! Visible on Desktop AND Mobile) --- */}
      {userInfo && !isMobileMenuOpen && (
        <div className="absolute top-16 md:top-20 left-0 w-full bg-gray-100 border-b border-gray-200 shadow-sm z-40">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="flex items-center h-16 md:h-12 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {/* FIX: ONE Unified Flex Container. 
                  Mobile: w-full and justify-between (forces perfectly equal distance).
                  Desktop: justify-start with massive gaps (md:gap-10 lg:gap-14). 
              */}
              <div className="flex items-center justify-between md:justify-start w-full min-w-max px-2 md:px-0 gap-4 sm:gap-6 md:gap-10 lg:gap-14">
                <Link
                  to="/quiz"
                  className="hidden md:flex bg-blue-600 text-white px-5 py-1.5 rounded-md font-bold hover:bg-blue-700 shadow-sm transition items-center text-sm"
                >
                  <FaPlay className="mr-1.5 text-xs" /> Start Test
                </Link>

                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-blue-600 transition flex flex-col md:flex-row items-center font-medium text-[10px] sm:text-xs md:text-sm"
                >
                  <FaChartPie className="mb-1 md:mb-0 md:mr-1.5 text-xl md:text-base text-gray-400" />
                  <span className="hidden sm:inline">Dashboard</span>
                  <span className="sm:hidden tracking-tight">Dashboard</span>
                </Link>

                <Link
                  to="/history"
                  className="text-gray-600 hover:text-blue-600 transition flex flex-col md:flex-row items-center font-medium text-[10px] sm:text-xs md:text-sm"
                >
                  <FaHistory className="mb-1 md:mb-0 md:mr-1.5 text-xl md:text-base text-gray-400" />
                  <span className="hidden sm:inline">Test History</span>
                  <span className="sm:hidden tracking-tight">History</span>
                </Link>

                <Link
                  to="/payment-history"
                  className="text-gray-600 hover:text-blue-600 transition flex flex-col md:flex-row items-center font-medium text-[10px] sm:text-xs md:text-sm"
                >
                  <FaReceipt className="mb-1 md:mb-0 md:mr-1.5 text-xl md:text-base text-gray-400" />
                  <span className="hidden sm:inline">Billing & Receipts</span>
                  <span className="sm:hidden tracking-tight">Billing</span>
                </Link>

                {userInfo.isAdmin && (
                  <Link
                    to="/admin"
                    className="text-purple-600 hover:text-purple-700 transition flex flex-col md:flex-row items-center font-bold text-[10px] sm:text-xs md:text-sm"
                  >
                    <FaUserShield className="mb-1 md:mb-0 md:mr-1.5 text-xl md:text-base" />
                    <span className="hidden sm:inline">Admin Panel</span>
                    <span className="sm:hidden tracking-tight">Admin</span>
                  </Link>
                )}

                {/* FIX: Logout is inside the same container so it distributes evenly on mobile. 
                    Added md:ml-auto so it docks cleanly to the far right ONLY on desktop! */}
                <div className="md:ml-auto pl-4 md:pl-8 border-l border-gray-300 flex items-center">
                  <button
                    onClick={logoutHandler}
                    className="text-red-500 hover:text-red-600 font-bold transition flex flex-col md:flex-row items-center text-[10px] sm:text-xs md:text-sm"
                  >
                    <FaSignOutAlt className="mb-1 md:mb-0 md:mr-1.5 text-xl md:text-base" />
                    <span className="hidden sm:inline">Logout</span>
                    <span className="sm:hidden tracking-tight">Exit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
// // client/src/components/Header.jsx
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../slices/authSlice';
// import logo from '../assets/images/IQlogo.webp';

// // Imported clean icons for the sub-navbar
// import { FaPlay, FaChartPie, FaHistory, FaReceipt, FaUserShield, FaSignOutAlt } from 'react-icons/fa';

// const Header = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const { userInfo } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const logoutHandler = () => {
//     dispatch(logout());
//     setIsMobileMenuOpen(false);
//     navigate('/');
//   };

//   return (
//     <>
//       {/* --- MAIN NAVBAR (FIXED) --- */}
//       <header className="fixed w-full z-50 top-0 left-0 bg-white shadow-sm border-b border-gray-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 md:h-20 items-center">

//             {/* Logo */}
//             <div className="flex-shrink-0 flex items-center">
//               <Link to='/' onClick={() => setIsMobileMenuOpen(false)}>
//                 <img className="h-10 md:h-14 w-auto drop-shadow-sm transition-transform hover:scale-105" src={logo} alt="IQ Scaler Logo" />
//               </Link>
//             </div>

//             {/* Desktop Navigation (Main) */}
//             <nav className="hidden md:flex space-x-8 items-center">
//               <Link to='/' className="text-gray-600 hover:text-blue-600 font-medium transition duration-200">Home</Link>
//               <Link to='/faq' className="text-gray-600 hover:text-blue-600 font-medium transition duration-200">FAQ</Link>
//               <Link to='/about' className="text-gray-600 hover:text-blue-600 font-medium transition duration-200">About Us</Link>
//               <Link to='/contact' className="text-gray-600 hover:text-blue-600 font-medium transition duration-200">Contact</Link>
//               <Link to='/leaderboard' className="text-blue-600 hover:text-blue-800 font-bold transition duration-200 flex items-center">
//                 <span className="mr-1">🏆</span> Leaderboard
//               </Link>
//             </nav>

//             {/* Desktop Auth / Welcome Text */}
//             <div className="hidden md:flex items-center space-x-4">
//               {!userInfo ? (
//                 <>
//                   <Link to='/login' className="text-gray-600 font-medium hover:text-blue-600 transition">Sign In</Link>
//                   <Link to='/register' className="bg-blue-50 text-blue-600 px-5 py-2 rounded-lg font-bold hover:bg-blue-100 border border-blue-200 transition">Sign Up</Link>
//                   <Link to='/quiz' className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 shadow-md transition duration-200">
//                     Start Test
//                   </Link>
//                 </>
//               ) : (
//                 <div className="text-gray-800 font-bold bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
//                   Welcome, {userInfo.username}
//                 </div>
//               )}
//             </div>

//             {/* Mobile menu button & Welcome */}
//             <div className="md:hidden flex items-center space-x-3">
//               {userInfo && <span className="text-gray-800 font-bold text-sm truncate max-w-[120px]">Hi, {userInfo.username}</span>}
//               <button
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className="text-gray-600 hover:text-blue-600 focus:outline-none p-1"
//               >
//                 <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   {isMobileMenuOpen ? (
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   ) : (
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                   )}
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu Dropdown */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden bg-white shadow-xl border-t border-gray-100 absolute w-full max-h-[calc(100vh-64px)] overflow-y-auto">
//             <div className="px-4 pt-2 pb-6 space-y-3 flex flex-col">
//               <Link to='/' onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium py-2 border-b border-gray-100">Home</Link>
//               <Link to='/leaderboard' onClick={() => setIsMobileMenuOpen(false)} className="text-blue-600 font-bold py-2 border-b border-gray-100">🏆 Leaderboard</Link>
//               <Link to='/faq' onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium py-2 border-b border-gray-100">FAQ</Link>
//               <Link to='/about' onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium py-2 border-b border-gray-100">About Us</Link>
//               <Link to='/contact' onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium py-2 border-b border-gray-100">Contact Us</Link>

//               {!userInfo && (
//                 <div className="flex flex-col space-y-2 mt-4">
//                   <Link to='/login' onClick={() => setIsMobileMenuOpen(false)} className="text-center text-gray-700 font-bold py-2 border border-gray-300 rounded-lg">Sign In</Link>
//                   <Link to='/register' onClick={() => setIsMobileMenuOpen(false)} className="text-center bg-blue-50 text-blue-600 font-bold py-2 border border-blue-200 rounded-lg">Sign Up</Link>
//                 </div>
//               )}

//               <Link to='/quiz' onClick={() => setIsMobileMenuOpen(false)} className="bg-blue-600 text-white text-center py-3 rounded-lg font-bold shadow-md mt-4">
//                 Start Test
//               </Link>
//             </div>
//           </div>
//         )}
//       </header>

//       {/* --- SUB NAVBAR (ABSOLUTE: Scrolls away! Visible on Desktop AND Mobile) --- */}
//       {userInfo && !isMobileMenuOpen && (
//         <div className="absolute top-16 md:top-20 left-0 w-full bg-gray-100 border-b border-gray-200 shadow-sm z-40">
//           <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">

//             {/* Height slightly taller on mobile (h-16) to accommodate stacked text/icons */}
//             <div className="flex items-center justify-between h-16 md:h-12 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

//               {/* Left Side: Links & Action Button */}
//               <div className="flex items-center gap-6 md:gap-6 min-w-max pr-4">

//                 <Link to='/quiz' className="hidden md:flex bg-blue-600 text-white px-5 py-1.5 rounded-md font-bold hover:bg-blue-700 shadow-sm transition items-center text-sm">
//                   <FaPlay className="mr-1.5 text-xs" /> Start Test
//                 </Link>

//                 {/* FIX: `flex-col md:flex-row`, text slightly smaller, icons stacked on mobile */}
//                 <Link to='/dashboard' className="text-gray-600 hover:text-blue-600 transition flex flex-col md:flex-row items-center font-medium text-[10px] sm:text-xs md:text-sm">
//                   <FaChartPie className="mb-1 md:mb-0 md:mr-1.5 text-xl md:text-base text-gray-400" />
//                   <span className="hidden sm:inline">Dashboard</span>
//                   <span className="sm:hidden tracking-tight">Dashboard</span>
//                 </Link>

//                 <Link to='/history' className="text-gray-600 hover:text-blue-600 transition flex flex-col md:flex-row items-center font-medium text-[10px] sm:text-xs md:text-sm">
//                   <FaHistory className="mb-1 md:mb-0 md:mr-1.5 text-xl md:text-base text-gray-400" />
//                   <span className="hidden sm:inline">Test History</span>
//                   <span className="sm:hidden tracking-tight">History</span>
//                 </Link>

//                 <Link to='/payment-history' className="text-gray-600 hover:text-blue-600 transition flex flex-col md:flex-row items-center font-medium text-[10px] sm:text-xs md:text-sm">
//                   <FaReceipt className="mb-1 md:mb-0 md:mr-1.5 text-xl md:text-base text-gray-400" />
//                   <span className="hidden sm:inline">Billing & Receipts</span>
//                   <span className="sm:hidden tracking-tight">Billing</span>
//                 </Link>

//                 {userInfo.isAdmin && (
//                   <Link to='/admin' className="text-purple-600 hover:text-purple-700 transition flex flex-col md:flex-row items-center font-bold text-[10px] sm:text-xs md:text-sm">
//                     <FaUserShield className="mb-1 md:mb-0 md:mr-1.5 text-xl md:text-base" />
//                     <span className="hidden sm:inline">Admin Panel</span>
//                     <span className="sm:hidden tracking-tight">Admin</span>
//                   </Link>
//                 )}
//               </div>

//               {/* Right Side: Logout */}
//               <div className="min-w-max ml-auto pl-4 border-l border-gray-300">
//                 <button onClick={logoutHandler} className="text-red-500 hover:text-red-600 font-bold transition flex flex-col md:flex-row items-center text-[10px] sm:text-xs md:text-sm">
//                   <FaSignOutAlt className="mb-1 md:mb-0 md:mr-1.5 text-xl md:text-base" />
//                   <span className="hidden sm:inline">Logout</span>
//                   <span className="sm:hidden tracking-tight">Exit</span>
//                 </button>
//               </div>

//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Header;
