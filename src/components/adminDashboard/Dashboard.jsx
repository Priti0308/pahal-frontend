import { useState, useEffect } from "react";
import { FaUsers, FaCalendarAlt, FaCheckCircle, FaClock } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../../context/constants";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    overview: {
      totalEvents: 0,
      activeEvents: 0,
      totalParticipants: 0,
      inactiveEvents: 0
    },
    eventsByCategory: [],
    topEvents: [],
    recentRegistrations: [],
    registrationTrend: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/admin/dashboard/stats`);
        setDashboardData(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard data');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  }

  const { overview, recentRegistrations } = dashboardData;

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
            <h2 className="text-2xl font-bold">{overview.totalEvents}</h2>
            <p className="text-gray-600">Total Events</p>
          </div>
        </div>

        {/* Active Events */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-xl transition duration-300">
          <FaClock size={40} className="text-yellow-500" />
          <div>
            <h2 className="text-2xl font-bold">{overview.activeEvents}</h2>
            <p className="text-gray-600">Active Events</p>
          </div>
        </div>

        {/* Inactive Events */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-xl transition duration-300">
          <FaCheckCircle size={40} className="text-green-500" />
          <div>
            <h2 className="text-2xl font-bold">{overview.inactiveEvents}</h2>
            <p className="text-gray-600">Inactive Events</p>
          </div>
        </div>

        {/* Total Participants */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-xl transition duration-300">
          <FaUsers size={40} className="text-purple-500" />
          <div>
            <h2 className="text-2xl font-bold">{overview.totalParticipants}</h2>
            <p className="text-gray-600">Total Participants</p>
          </div>
        </div>
      </div>

      {/* Event Category Breakdown */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">Events by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dashboardData.eventsByCategory.map((category) => (
          <div key={category._id} className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-xl transition duration-300">
            <div className="p-3 rounded-full bg-blue-100">
              <FaCalendarAlt size={24} className="text-blue-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{category.count}</h2>
              <p className="text-gray-600">{category._id}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Top Events */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">Top Events</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left py-2 px-4 border-b">Event Title</th>
              <th className="text-left py-2 px-4 border-b">Category</th>
              <th className="text-right py-2 px-4 border-b">Participants</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.topEvents.map((event) => (
              <tr key={event._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{event.title}</td>
                <td className="py-2 px-4 border-b">{event.category}</td>
                <td className="py-2 px-4 border-b text-right">{event.attendees}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Registrations */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">Recent Registrations</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <ul className="space-y-3">
          {recentRegistrations.map((registration) => (
            <li key={registration._id} className="border-b pb-2">
              <span className="font-bold text-blue-600">{registration.teamName}</span> registered for{" "}
              <span className="font-bold">{registration.eventId.title}</span> on{" "}
              <span className="text-gray-500">
                {new Date(registration.registrationDate).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </div>

      
    </div>
  );
};

export default Dashboard;