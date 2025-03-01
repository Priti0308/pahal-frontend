import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/"><div className="flex items-center space-x-2">
          <img 
            src= {logo} 
            alt="CIMDR Logo" 
            className="h-12"
          />
          <span className="text-blue-600 text-3xl font-bold tracking-wider">CIMDR</span>
        </div></Link>
        
        
        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/events" className="text-gray-800 hover:text-blue-600 font-medium">Events</Link>
          <Link to="/gallery" className="text-gray-500 hover:text-blue-600 font-medium">Gallery</Link>
          <Link to="/about" className="text-gray-500 hover:text-blue-600 font-medium">About</Link>
          <Link to="/contact" className="text-gray-500 hover:text-blue-600 font-medium">Contact</Link>
        </nav>
        
        {/* Register Button */}
        <Link 
          to="/register"className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-200"
        >
          Register Now
        </Link>
        
      </div>
      
      {/* Colored Band at Bottom */}
      {/* <div className="h-2 bg-gradient-to-r from-purple-700 via-blue-500 to-purple-700"></div> */}
    </header>
  );
};

export default Header;