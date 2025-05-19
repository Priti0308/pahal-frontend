import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope, FaYoutube } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> {/* Changed from grid-cols-4 to grid-cols-3 */}
          {/* Institute Info */}
          <div className="flex flex-col">
            <div className="flex items-center justify-center mb-4">
              <img src={logo} alt="CIMDR Logo" className="h-16 w-auto" />
            </div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">CIMDR</h2>
              <p className="text-xl mb-4">Institute Code : MB 6208.</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <FaMapMarkerAlt className="mr-2" />
                <p>DES Campus, P.O. Willingdon College, Vishrambag, Sangli, Maharashtra, India</p>
              </div>
              <div className="flex items-center text-gray-300">
                <FaPhone className="mr-2" />
                <p>
                  <span className="font-semibold">Phone: </span>
                  <a href="tel:+912332601040" className="hover:text-white">0233-2601040</a>,{" "}
                  <a href="tel:+919270103056" className="hover:text-white">9270103056</a>
                </p>
              </div>
              <div className="flex items-center text-gray-300">
                <FaEnvelope className="mr-2" />
                <p>
                  <span className="font-semibold">Email: </span>
                  <a href="mailto:office.cimdr@despune.org" className="hover:text-white">office.cimdr@despune.org</a>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                <span className="hover:translate-x-2 transition-transform duration-300">Home</span>
              </Link></li>
              <li><Link to="/events" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                <span className="hover:translate-x-2 transition-transform duration-300">Events</span>
              </Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                <span className="hover:translate-x-2 transition-transform duration-300">Gallery</span>
              </Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                <span className="hover:translate-x-2 transition-transform duration-300">About Us</span>
              </Link></li>
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2">Important Links</h3>
            <ul className="space-y-3">
              <li><a href="https://cimdr.ac.in" target="_blank" rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                <span className="hover:translate-x-2 transition-transform duration-300">CIMDR Website</span>
              </a></li>
              <li><a href="https://www.cimdr.edu.in/admission" target="_blank" rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                <span className="hover:translate-x-2 transition-transform duration-300">Admissions</span>
              </a></li>
              <li><Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                <span className="hover:translate-x-2 transition-transform duration-300">Privacy Policy</span>
              </Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                <span className="hover:translate-x-2 transition-transform duration-300">Terms of Service</span>
              </Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-10 border-gray-700" />

        {/* Social Media Icons */}
        <div className="flex items-center justify-center space-x-6 mb-8">
          <a href="https://www.facebook.com/des.cimdr.1" target="_blank" rel="noopener noreferrer" 
            className="text-gray-300 hover:text-white transition-colors duration-300">
            <FaFacebook size={28} />
          </a>
          <a href="https://www.instagram.com/cimdr.sangli" target="_blank" rel="noopener noreferrer" 
            className="text-gray-300 hover:text-white transition-colors duration-300">
            <FaInstagram size={28} />
          </a>
          <a href="https://www.youtube.com/@descimdrofficial743" target="_blank" rel="noopener noreferrer" 
            className="text-gray-300 hover:text-white transition-colors duration-300">
            <FaYoutube size={28} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400">
          <p>© {new Date().getFullYear()} Pahal - CIMDR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;