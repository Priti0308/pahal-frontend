import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";

const EventBanner = ({ event }) => {
  if (!event) return null;

  return (
    <div className="relative w-full max-w-6xl mx-auto h-[500px] overflow-hidden rounded-xl shadow-lg">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center rounded-xl"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 32, 0.7), rgba(0, 0, 32, 0.7)), url(${event.bannerImage})`,
        }}
      />
      
      {/* Content Container */}
      <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-6">
        <h1 className="text-5xl font-extrabold mb-4 tracking-wide">{event.emoji} {event.title}</h1>
        <p className="text-xl mb-8 max-w-2xl">Join us for an electrifying software development competition where innovation meets creativity!</p>
        
        {/* Event Details */}
        <div className="flex flex-wrap justify-center gap-6 text-lg bg-white/20 backdrop-blur-lg px-6 py-3 rounded-lg shadow-md">
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-yellow-300" />
            <span className="font-semibold">{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-300" />
            <span className="font-semibold">{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-red-300" />
            <span className="font-semibold">{event.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventBanner;