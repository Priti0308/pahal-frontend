import { useState, useEffect } from "react";
import { FaUserCog, FaKey, FaPalette, FaMoon, FaSun, FaSpinner } from "react-icons/fa"; 
import apiService from "../../context/apiService";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await apiService.get("/auth/me");
        setAdminData(response.admin);
        setLoading(false);
      } catch (err) {
        setError("Failed to load user information. Please try again later.");
        setLoading(false);
      }
    }

    fetchAdminData();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (newPassword !== newPasswordConfirm) {
      setError("Passwords do not match");
      return;
    }
    
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    
    try { 
      await apiService.put("/auth/change-password", { 
        oldPassword, 
        newPassword 
      });
      setSuccessMessage("Password updated successfully");
      setOldPassword("");
      setNewPassword("");
      setNewPasswordConfirm("");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password");
    }
  }; 

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} min-h-screen`}> 
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FaUserCog className="mr-3 text-blue-500" /> Admin Settings
      </h1> 
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
          <p>{successMessage}</p>
        </div>
      )} 
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Admin Profile</h2>
        
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <FaSpinner className="animate-spin text-2xl text-blue-500" />
          </div>
        ) : adminData ? (
          <>
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
                {adminData.username ? adminData.username.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="ml-4">
                <p className="text-lg font-medium">{adminData.username}</p>
                <p className="text-gray-500 dark:text-gray-400">{adminData.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
                <p className="font-medium">{adminData.role}</p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                <p className="font-medium">
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${adminData.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  {adminData.isActive ? 'Active' : 'Inactive'}
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                <p className="text-sm text-gray-500 dark:text-gray-400">Account Created</p>
                <p className="font-medium">{formatDate(adminData.createdAt)}</p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
                <p className="font-medium">{formatDate(adminData.updatedAt)}</p>
              </div>
            </div>
          </>
        ) : (
          <p>No user information available</p>
        )}
      </div> 
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaKey className="mr-2 text-red-500" /> Change Password
        </h2>
        <form onSubmit={handlePasswordChange}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-blue-500 dark:bg-gray-700"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-blue-500 dark:bg-gray-700"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={newPasswordConfirm}
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-blue-500 dark:bg-gray-700"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;