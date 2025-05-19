import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
      
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Pahal Logo" className="h-10 w-10" />
          <h1 className="text-xl font-bold uppercase text-yellow-400">Pahal Admin</h1>
        </div>

      
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/admin/dashboard" className="hover:text-yellow-400 transition">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/events" className="hover:text-yellow-400 transition">
              Events
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="hover:text-yellow-400 transition">
              Users
            </Link>
          </li>
        </ul>

        {/* Right - Profile & Logout */}
        <div className="hidden md:flex items-center space-x-4">
          <FaUserCircle size={24} className="text-yellow-400" />
          <button className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition">
            Logout
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-4 space-y-3 text-center">
          <li>
            <Link to="/admin/dashboard" className="block py-2 hover:text-yellow-400 transition">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/events" className="block py-2 hover:text-yellow-400 transition">
              Events
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="block py-2 hover:text-yellow-400 transition">
              Users
            </Link>
          </li>
          <li>
            <button className="bg-red-600 w-full py-2 rounded-md hover:bg-red-700 transition">
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
