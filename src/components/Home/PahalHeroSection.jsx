import React from 'react';

const PahalHeroSection = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-black">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-purple-900/60 to-blue-900/60 mix-blend-multiply"
          style={{
            backgroundImage: "url('/path-to-your-event-image.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative flex flex-col h-full justify-center px-8 md:px-16 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Pahal: CIMDR Inter-Collegiate Competition 2024
          </h1>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-white mb-12 opacity-90">
            Join us for the biggest inter-collegiate event showcasing talent in Software,
            Management, and Soft Skills. Experience three days of innovation, competition, and
            networking opportunities.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            {/* <button className="px-8 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition duration-300">
              Register Now
            </button> */
            <a href="/register"><button className="px-8 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition duration-300">
                    Register Now
                  </button></a>
            
            
            }
            <button className="px-8 py-3 bg-transparent text-white font-semibold border border-white rounded hover:bg-white/10 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      {/* Optional: Add color beams/lights as decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-purple-500/30 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-blue-500/30 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-96 bg-green-500/20 rounded-full filter blur-3xl"></div>
      </div>
    </div>
  );
};

export default PahalHeroSection;