import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FilterButtons = () => {
  const [activeFilter, setActiveFilter] = useState(null);

  const filters = [
    {
      id: 'years',
      label: 'All Years',
      options: ['2024', '2023', '2022', '2021', '2020']
    },
    {
      id: 'categories',
      label: 'All Categories',
      options: ['Academic', 'Sports', 'Arts', 'Technology', 'Business']
    },
    {
      id: 'types',
      label: 'All Competition Types',
      options: ['Individual', 'Team', 'National', 'International']
    }
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 my-6">
      {filters.map((filter) => (
        <div key={filter.id} className="relative">
          <button
            onClick={() => setActiveFilter(activeFilter === filter.id ? null : filter.id)}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg
              font-medium transition-all duration-200
              ${activeFilter === filter.id 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
              }
            `}
          >
            {filter.label}
            <ChevronDown 
              className={`w-4 h-4 transition-transform duration-200 
                ${activeFilter === filter.id ? 'rotate-180' : ''}`
              }
            />
          </button>
          
          {/* Dropdown Menu */}
          {activeFilter === filter.id && (
            <div className="absolute z-10 w-full mt-2 py-2 bg-white rounded-lg shadow-xl border border-gray-200">
              {filter.options.map((option) => (
                <button
                  key={option}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterButtons;