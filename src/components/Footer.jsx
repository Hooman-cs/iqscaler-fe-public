// client/src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    /* mt-auto: Keeps the footer at the bottom.
       bg-gray-50: Light gray background to show the logo clearly.
       border-t: Subtle separator from the main content.
    */
    <footer className="bg-gray-200 text-gray-700 py-12 mt-auto border-t border-gray-200 w-full">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          
          {/* Column 1: Logo and Brief About */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <Link to="/">
              {/* Pointing to the logo in your public directory */}
              <img 
                src="/IQlogo.ico" 
                alt="IQScaler Logo" 
                className="h-12 w-auto grayscale-0 hover:opacity-80 transition-opacity" 
              />
            </Link>
            <p className="text-sm text-gray-500 text-center md:text-left leading-relaxed max-w-xs">
              Empowering individuals with scientifically grounded cognitive assessments. 
              We bring clarity to intelligence measurement through modern, accessible psychometrics.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-widest text-xs">Platform</h4>
            <nav className="flex flex-col space-y-3 text-sm font-medium items-center md:items-start">
              <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About Us</Link>
              <Link to="/faq" className="text-gray-600 hover:text-blue-600 transition-colors">FAQ</Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact Us</Link>
            </nav>
          </div>

          {/* Column 3: Legal Links
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-widest text-xs">Legal</h4>
            <nav className="flex flex-col space-y-3 text-sm font-medium items-center md:items-start">
              <Link to="/privacy-policy" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</Link>
              <Link to="/terms-and-conditions" className="text-gray-600 hover:text-blue-600 transition-colors">Terms & Conditions</Link>
            </nav>
          </div> */}

          {/* Column 3: Legal Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-widest text-xs">Legal</h4>
            <nav className="flex flex-col space-y-3 text-sm font-medium items-center md:items-start">
              <Link to="/privacy-policy" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</Link>
              <Link to="/terms-and-conditions" className="text-gray-600 hover:text-blue-600 transition-colors">Terms & Conditions</Link>
              {/* New Link Added Here */}
              <Link to="/refund-policy" className="text-gray-600 hover:text-blue-600 transition-colors">Refund Policy</Link>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-500 mb-8"></div>

        {/* Bottom Section: Copyright & Disclaimer */}
        <div className="text-center">
          <p className="text-gray-500 text-xs md:text-sm tracking-wide font-medium">
            IQScaler Platform &copy; {new Date().getFullYear()} IQScaler.com.
          </p>
          <p className="text-[10px] md:text-xs text-gray-400 mt-4 max-w-3xl mx-auto leading-relaxed">
            All rights reserved by <strong><a href="https://www.jdpcglobal.com" target="_blank" rel="noopener noreferrer"><i>JDPC Global</i></a></strong>.
          </p>
          <p className="text-[10px] md:text-xs text-gray-400 mt-4 max-w-3xl mx-auto leading-relaxed italic">
            Disclaimer: The test provided is for informational and self-assessment purposes only and is not a substitute for professional clinical evaluation.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;