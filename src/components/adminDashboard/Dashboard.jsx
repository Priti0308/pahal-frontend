import { FaUsers, FaCalendarAlt, FaCheckCircle, FaClock } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="p-6">
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Events */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-xl transition duration-300">
          <FaCalendarAlt size={40} className="text-blue-500" />
          <div>
            <h2 className="text-2xl font-bold">120</h2>
            <p className="text-gray-600">Total Events</p>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-xl transition duration-300">
          <FaClock size={40} className="text-yellow-500" />
          <div>
            <h2 className="text-2xl font-bold">15</h2>
            <p className="text-gray-600">Upcoming Events</p>
          </div>
        </div>

        {/* Past Events */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-xl transition duration-300">
          <FaCheckCircle size={40} className="text-green-500" />
          <div>
            <h2 className="text-2xl font-bold">105</h2>
            <p className="text-gray-600">Past Events</p>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-xl transition duration-300">
          <FaUsers size={40} className="text-purple-500" />
          <div>
            <h2 className="text-2xl font-bold">300</h2>
            <p className="text-gray-600">Total Users</p>
          </div>
        </div>
      </div>

      {/* User Statistics */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">User Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-xl transition duration-300">
          <FaUsers size={40} className="text-red-500" />
          <div>
            <h2 className="text-2xl font-bold">20</h2>
            <p className="text-gray-600">Admins</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-xl transition duration-300">
          <FaUsers size={40} className="text-teal-500" />
          <div>
            <h2 className="text-2xl font-bold">50</h2>
            <p className="text-gray-600">Organizers</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-xl transition duration-300">
          <FaUsers size={40} className="text-blue-500" />
          <div>
            <h2 className="text-2xl font-bold">230</h2>
            <p className="text-gray-600">General Users</p>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">Recent Activities</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <ul className="space-y-3">
          <li className="border-b pb-2">
            <span className="font-bold text-blue-600">Tech Meetup</span> was added on <span className="text-gray-500">March 7, 2025</span>.
          </li>
          <li className="border-b pb-2">
            <span className="font-bold text-green-600">New User</span> "John Doe" registered as an organizer.
          </li>
          <li className="border-b pb-2">
            <span className="font-bold text-yellow-600">Art Exhibition</span> was updated with new details.
          </li>
          <li>
            <span className="font-bold text-red-600">User "AdminX"</span> modified event permissions.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
