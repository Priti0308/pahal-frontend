import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="CIMDR Logo" className="h-12" />
            <span className="text-blue-600 text-3xl font-bold tracking-wider">
              CIMDR
            </span>
          </div>
        </Link>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          className="md:hidden flex items-center"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-gray-800 hover:text-blue-600 font-medium"
          >
            Home
          </Link>
          <Link
            to="/events"
            className="text-gray-800 hover:text-blue-600 font-medium"
          >
            Events
          </Link>
          <Link
            to="/gallery"
            className="text-gray-500 hover:text-blue-600 font-medium"
          >
            Gallery
          </Link>
          <Link
            to="/about"
            className="text-gray-500 hover:text-blue-600 font-medium"
          >
            About
          </Link>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/events"
                className="text-gray-800 hover:text-blue-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>
              <Link
                to="/gallery"
                className="text-gray-500 hover:text-blue-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link
                to="/about"
                className="text-gray-500 hover:text-blue-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
