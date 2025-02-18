import React from 'react';
import cimdr from '../../assets/cimdr.jpg';

const AboutCIMDRSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Content Column */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About CIMDR</h2>
            
            <p className="text-gray-700 mb-4">
              CIMDR is a premier institute dedicated to nurturing future leaders through
              comprehensive education and practical exposure. Our inter-collegiate competition
              brings together the brightest minds from across the country.
            </p>
            
            <p className="text-gray-700">
              With over 20 years of excellence in education, we've established ourselves as a hub
              for innovation, leadership, and skill development.
            </p>
          </div>
          
          {/* Image Column */}
          <div className="w-full md:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src={cimdr} 
                alt="CIMDR Institute Building" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCIMDRSection;