import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  FaCalendarAlt,
  FaUserAstronaut,
  FaBars,
  FaCog,
  FaTachometerAlt,
} from "react-icons/fa";
import logo from "../../assets/logo.png"; 

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`bg-gray-900 text-white ${
        isOpen ? "w-64" : "w-20"
      } min-h-screen p-4 transition-all duration-300 flex flex-col shadow-lg`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white mb-4 focus:outline-none self-end hover:text-yellow-400 transition"
      >
        <FaBars size={24} />
      </button>

      <div className="flex items-center mb-8">
        <img
          src={logo}
          alt="Pahal Logo"
          className="h-12 rounded-full border border-yellow-400 p-1"
        />
        {isOpen && (
          <h2 className="text-xl font-bold uppercase text-yellow-400 ml-3">
            Pahal Admin
          </h2>
        )}
      </div>

      <ul className="space-y-4">
        <li
          className={`${
            location.pathname === "/admin/dashboard" ? "bg-gray-700" : ""
          } rounded-lg`}
        >
          <Link
            to="/admin/dashboard"
            className="flex items-center px-4 py-2 hover:bg-gray-800 rounded-md transition"
          >
            <FaTachometerAlt size={20} className="mr-2 text-yellow-400" />
            {isOpen && "Dashboard"}
          </Link>
        </li>

        <li
          className={`${
            location.pathname === "/admin/events" ? "bg-gray-700" : ""
          } rounded-lg`}
        >
          <Link
            to="/admin/manage-events"
            className="flex items-center px-4 py-2 hover:bg-gray-800 rounded-md transition"
          >
            <FaCalendarAlt size={20} className="mr-2 text-blue-400" />
            {isOpen && "Manage Events"}
          </Link>
        </li>
        <li
          className={`${
            location.pathname === "/admin/events" ? "bg-gray-700" : ""
          } rounded-lg`}
        >
          <Link
            to="/admin/event-list"
            className="flex items-center px-4 py-2 hover:bg-gray-800 rounded-md transition"
          >
            <FaUserAstronaut size={20} className="mr-2 text-blue-400" />
            {isOpen && "View Participants"}
          </Link>
        </li>
        

        <li
          className={`${
            location.pathname === "/admin/settings" ? "bg-gray-700" : ""
          } rounded-lg`}
        >
          <Link
            to="/admin/settings"
            className="flex items-center px-4 py-2 hover:bg-gray-800 rounded-md transition"
          >
            <FaCog size={20} className="mr-2 text-red-400" />
            {isOpen && "Settings"}
          </Link>
        </li>
      </ul>


      <div className={`mt-auto text-center ${isOpen ? "text-sm" : "hidden"}`}>
        <p className="text-gray-400">© 2025 Pahal Event</p>
      </div>
    </div>
  );
};

export default Sidebar;
