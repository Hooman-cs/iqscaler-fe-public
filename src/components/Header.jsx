//client/src/components/Header.jsx

import React, { useState } from 'react'; // Added useState
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';
import logo from '../assets/images/IQlogo.webp';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile state
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const baseNavLinkClasses = 'text-gray-300 hover:text-white transition duration-200 text-sm font-medium py-2 md:py-0';
  const dropdownItemClasses = 'text-gray-700 px-4 py-3 text-sm block hover:bg-gray-100 transition duration-150 cursor-pointer border-b border-gray-200 last:border-b-0';

  const renderDropdownItem = (to, label, onClick = null) => (
    <div 
      key={label}
      onClick={() => {
        if (onClick) onClick();
        else navigate(to);
        setIsMobileMenuOpen(false); // Close menu on click
      }}
      className={dropdownItemClasses}
    >
      {label}
    </div>
  );

return (
  /* Changed bg-gray-800 to bg-white and text-white to text-gray-800 */
  <header className="bg-white py-3 sticky top-0 z-50 shadow-sm border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      
      {/* --- 1. BRAND LOGO --- */}
      <Link 
        to='/' 
        className="flex items-center gap-2 text-gray-900 text-xl md:text-2xl font-extrabold tracking-wider flex-shrink-0"
      >
        <img 
          src={logo} 
          alt="IQScaler Logo" 
          className="h-15 w-20 object-contain transition-transform duration-300 hover:scale-105" 
        />
      </Link>
      
      {/* --- 2. MOBILE MENU BUTTON --- */}
      <button 
        className="md:hidden text-gray-600 hover:text-blue-600 focus:outline-none"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          )}
        </svg>
      </button>

      {/* --- 3. MAIN NAVIGATION (Desktop) --- */}
      <nav className="hidden md:flex items-center space-x-6">
        {/* Ensure baseNavLinkClasses in your file now uses dark text colors */}
        <Link to='/' className="text-gray-600 hover:text-blue-600 font-medium transition">Home</Link>
        <Link to='/faq' className="text-gray-600 hover:text-blue-600 font-medium transition">FAQ</Link>
        <Link to='/about' className="text-gray-600 hover:text-blue-600 font-medium transition">About Us</Link>
        <Link to='/contact' className="text-gray-600 hover:text-blue-600 font-medium transition">Contact Us</Link>

        <Link 
          to={userInfo ? '/quiz' : '/login'} 
          className="text-sm font-semibold rounded-lg px-5 py-2.5 bg-blue-600 text-white hover:bg-blue-700 transition duration-300 shadow-md"
        >
          Start Test
        </Link>
      </nav>

      {/* --- 4. AUTH (Desktop) --- */}
      <div className="hidden md:block">
        {userInfo ? (
          <div className="relative inline-block group">
            {/* Changed from text-white to text-gray-700 and hover:bg-gray-100 */}
            <span className="text-gray-700 font-medium px-3 py-2 flex items-center cursor-pointer rounded-md hover:bg-gray-50 transition">
              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              {userInfo.username} 
              <svg className="w-4 h-4 ml-2 group-hover:rotate-180 transition-transform" viewBox="0 0 20 20" fill="currentColor"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            </span>
            <div className="absolute top-full right-0 mt-2 bg-white min-w-[180px] rounded-lg shadow-xl border border-gray-100 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 transform scale-95 group-hover:scale-100 origin-top-right">
              {renderDropdownItem('/dashboard', 'Dashboard')}
              {renderDropdownItem('/history', 'Test History')}
              {userInfo.isAdmin && renderDropdownItem('/admin', 'Admin Dashboard')}
              <hr className="my-1 border-gray-100" />
              {renderDropdownItem('#logout', 'Logout', logoutHandler)}
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to='/login' className="text-gray-600 hover:text-blue-600 font-medium">Sign In</Link>
            <Link to='/register' className="border border-blue-600 text-blue-600 px-4 py-1.5 rounded-lg hover:bg-blue-50 transition font-medium">Sign Up</Link>
          </div>
        )}
      </div>

      {/* --- 5. MOBILE MENU --- */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 flex flex-col p-4 space-y-4 md:hidden shadow-lg">
          <Link to='/' onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium">Home</Link>
          <Link to='/faq' onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium">FAQ</Link>
          <Link to='/about' onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium">About Us</Link>
          <hr className="border-gray-100" />
          {/* Mobile Auth Links similarly updated to dark text */}
          {userInfo ? (
             <button onClick={logoutHandler} className="text-left text-red-500 font-medium py-2">Logout</button>
          ) : (
            <Link to='/login' onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium">Sign In</Link>
          )}
          <Link to='/quiz' onClick={() => setIsMobileMenuOpen(false)} className="bg-blue-600 text-white text-center py-3 rounded-md font-bold shadow-md">Start Test Now</Link>
        </div>
      )}
    </div>
  </header>
);
};

export default Header;