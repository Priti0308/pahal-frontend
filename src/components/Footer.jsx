import React from 'react';
import logo from '../assets/logo.png';
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-">
          {/* Institute Info */}
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <img
                src= {logo}
                alt="CIMDR Logo"
                className="h-16 w-auto mr-4"
              />
            </div>
            <p className="text-gray-300 mb-4">
              Pahal - Chintamanrao Institute of Management
              <br />
              Development And Research, Sangli
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Events</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Gallery</a></li>
              {/* <li><a href="/register" className="text-gray-300 hover:text-white transition-colors duration-300">Register</a></li> */}
            </ul>
          </div>

          {/* Events */}
          {/* <div>
            <h3 className="text-xl font-semibold mb-6">Events</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Peaching: Idea Peaching Event</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Add-Mad Show</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Code-A-Thon</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Virtual Trading</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Captura</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Quize</a></li>
            </ul>
          </div> */}

          {/* Connect */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Connect</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Terms of Service</a></li>
              
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-10 border-gray-700" />

        {/* Copyright */}
        <div className="text-center text-gray-400">
          <p>© 2025 Pahal - CIMDR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;