import React from 'react';
import logo from '../../assets/logo.png';
const FeaturedEvent = () => {
  return (
    <div className="my-12">
      <h2 className="text-2xl font-semibold mb-8 text-center">Upcoming Featured Event</h2>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/2">
          <img
            src={logo}
            alt="Tech Summit Stage"
            className="w-full h-[450px] object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <h3 className="text-2xl font-bold text-gray-900">Annual Tech Summit 2024</h3>
          <p className="text-gray-600 leading-relaxed">
            Join us for our biggest tech event of the year featuring industry leaders, innovative
            workshops, and networking opportunities.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span>March 15-16, 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-500 font-medium">Limited Seats</span>
            </div>
          </div>
          <button className="mt-6 px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
            Early Bird Registration
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvent;