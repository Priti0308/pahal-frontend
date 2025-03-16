import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminEventList() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleViewDetailsClick = (eventId) => {
    navigate(`/admin/events/${eventId}`);
  };

  if (loading) {
    return (
      <div className="py-16 bg-white text-center">
        <p>Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-white text-center">
        <p className="text-red-500">Error loading events: {error}</p>
      </div>
    );
  }

  return (
    <section className="py-8 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">Event Management</h2>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="py-3 px-4">Event</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">{event.title}</td>
                  <td className="py-3 px-4">{event.category}</td>
                  <td className="py-3 px-4">{event.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-md ${
                        event.status === "Active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleViewDetailsClick(event._id)}
                      className="py-2 px-4 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default AdminEventList;
