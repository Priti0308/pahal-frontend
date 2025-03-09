import React from "react";
import { useNavigate } from "react-router-dom";
import { listEvents } from "../data/eventData";

function EventList() {
  const navigate = useNavigate();

  const handleRegisterClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

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
          {listEvents.map((event) => (
            <div
              key={event.id}
              className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md"
            >
              {/* Event Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={event.image}
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
              <a href=""><button 
                    onClick={() => handleRegisterClick(event.id)}
                    className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition duration-300"
                  >
                    Register Now
                  </button></a>

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