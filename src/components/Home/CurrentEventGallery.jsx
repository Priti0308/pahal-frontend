import React, { useState } from 'react';
import logo from '../../assets/logo.png';
const CurrentEventGallery = () => {
  const galleryImages = [
    {
      id: 1,
      src: logo,
      alt: "Students celebrating with trophy",
    },
    {
      id: 2,
      src:logo,
      alt: "Students working in computer lab",
    },
    {
      id: 3,
      src: logo,
      alt: "Business presentation session",
    },
    {
      id: 4,
      src: logo,
      alt: "Cultural performance on stage",
    },
  ];

  // State for lightbox (optional feature)
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Current Event Gallery
          </h2>
          <p className="text-gray-600">
            Latest moments from our ongoing events
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Optional Lightbox - Uncomment if you want this feature */}
      {/*
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button 
              className="absolute -top-10 right-0 text-white text-xl"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
      */}
    </section>
  );
};

export default CurrentEventGallery;