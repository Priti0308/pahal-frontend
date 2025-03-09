import { useState } from "react";
import { FaUserCog, FaKey, FaPalette, FaMoon, FaSun } from "react-icons/fa";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <div className={`p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} min-h-screen`}>
      {/* Page Header */}
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FaUserCog className="mr-3 text-blue-500" /> Admin Settings
      </h1>

      {/* Profile Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Admin Profile</h2>
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/80" // Replace with actual profile picture
            alt="Admin"
            className="w-16 h-16 rounded-full border-2 border-gray-300"
          />
          <div className="ml-4">
            <p className="text-lg font-medium">Admin Name</p>
            <p className="text-gray-500 dark:text-gray-400">admin@example.com</p>
          </div>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaKey className="mr-2 text-red-500" /> Change Password
        </h2>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-blue-500 dark:bg-gray-700"
        />
        <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Update Password
        </button>
      </div>

      {/* Theme Toggle Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaPalette className="mr-2 text-purple-500" /> Theme Preferences
        </h2>
        <button
          className="flex items-center bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <FaSun className="text-yellow-500 mr-2" /> : <FaMoon className="text-gray-800 mr-2" />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  );
};

export default Settings;
