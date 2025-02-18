import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

// Stats Component
const StatsSection = () => {
  
};

// Filter Buttons Component
const FilterButtons = () => {
  return (
    <div className="flex justify-center gap-4 my-6">
      <button className="px-4 py-2 text-gray-600 hover:text-gray-900">All Years</button>
      <button className="px-4 py-2 text-gray-600 hover:text-gray-900">All Categories</button>
      <button className="px-4 py-2 text-gray-600 hover:text-gray-900">All Competition Types</button>
    </div>
  );
};

// Gallery Grid Component
const GalleryGrid = () => {
  const images = [
    "/api/placeholder/400/300",
    "/api/placeholder/400/300",
    "/api/placeholder/400/300",
    "/api/placeholder/400/300",
    "/api/placeholder/400/300",
    "/api/placeholder/400/300",
    "/api/placeholder/400/300",
    "/api/placeholder/400/300"
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
      {images.map((src, index) => (
        <div key={index} className="rounded-lg overflow-hidden shadow-md">
          <img src={src} alt={`Event ${index + 1}`} className="w-full h-48 object-cover" />
        </div>
      ))}
    </div>
  );
};

// Featured Event Component
const FeaturedEvent = () => {
  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Upcoming Featured Event</h2>
      <div className="relative">
        <img 
          src="/api/placeholder/1200/400" 
          alt="Tech Summit Stage" 
          className="w-full h-[400px] object-cover rounded-lg"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white rounded-b-lg">
          <h3 className="text-2xl font-bold mb-2">Annual Tech Summit 2024</h3>
          <p className="mb-4">Join us for our biggest tech event of the year featuring industry leaders, innovative workshops, and networking opportunities.</p>
          <div className="flex items-center justify-between">
            <span>March 15-16, 2024</span>
            <span className="text-yellow-400">Limited Seats</span>
          </div>
          <button className="mt-4 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800">
            Early Bird Registration
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Event Gallery Component
const EventGallery = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Event Gallery</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore the memorable moments from CIMDR's intercollegiate competitions featuring software
          development, management challenges, and soft skills events.
        </p>
        <div className="flex gap-4 justify-center mt-6">
          <button className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800">
            Register Now
          </button>
          <button className="px-6 py-2 border border-black text-black rounded-full hover:bg-gray-100">
            View Schedule
          </button>
        </div>
      </header>

      <StatsSection />
      <FilterButtons />
      <GalleryGrid />
      <FeaturedEvent />

      <div className="text-center mt-8">
        <button className="px-6 py-2 border border-black text-black rounded-full hover:bg-gray-100">
          Load More
        </button>
      </div>
    </div>
  );
};

export default EventGallery;