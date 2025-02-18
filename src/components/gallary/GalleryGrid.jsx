import React from 'react';
import logo from '../../assets/logo.png';
const GalleryGrid = () => {
  // Array of image descriptions for alt text
  const imageDescriptions = [
    "College debate competition",
    "College sports event",
    "Hackathon winners",
    "Science fair projects",
    "Music competition performance",
    "Robotics challenge",
    "Business pitch contest",
    "Arts exhibition"
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8 p-4">
      {imageDescriptions.map((description, index) => (
        <div 
          key={index} 
          className="group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative">
            <img 
              src={logo}
              alt={description}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;