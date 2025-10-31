import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import apiService from "../../src/context/apiService";
import apiservice from "../../src/context/apiService";
import { BASE_URL } from "../context/constants";
function EventList() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try { 
        const response = await fetch(`${BASE_URL}/events`); 
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setEvents(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  const handleRegisterClick = (eventId) => {
    navigate(`/events/${eventId}`);
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
          Upcoming Events
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Explore our exciting lineup of competitions and activities
        </p>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event._id}
              className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md"
            >
              {/* Event Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={event.bannerImage}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Event Meta */}
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-blue-700">
                    {event.category}
                  </span>
                  <span className="text-sm text-gray-500">{event.date}</span>
                </div>

                {/* Event Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {event.title}
                </h3>

                {/* Event Description */}
                <p className="text-gray-600 mb-6">{event.description}</p>

                {/* Register Button */}
                <div className="mt-auto">
                  <button 
                    onClick={() => handleRegisterClick(event._id)}
                    className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition duration-300"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EventList;