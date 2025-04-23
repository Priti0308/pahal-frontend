import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900/95 backdrop-blur-sm py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="CIMDR Logo" className="h-12 w-auto" />
            <span className="text-white font-semibold text-xl">Pahal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-blue-400 transition-colors duration-300">Home</Link>
            <Link to="/events" className="text-white hover:text-blue-400 transition-colors duration-300">Events</Link>
            <Link to="/gallery" className="text-white hover:text-blue-400 transition-colors duration-300">Gallery</Link>
            <Link to="/about" className="text-white hover:text-blue-400 transition-colors duration-300">About</Link>
            
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="flex flex-col space-y-4 pb-4">
            <Link to="/" className="text-white hover:text-blue-400 transition-colors duration-300">Home</Link>
            <Link to="/events" className="text-white hover:text-blue-400 transition-colors duration-300">Events</Link>
            <Link to="/gallery" className="text-white hover:text-blue-400 transition-colors duration-300">Gallery</Link>
            <Link to="/about" className="text-white hover:text-blue-400 transition-colors duration-300">About</Link>
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;