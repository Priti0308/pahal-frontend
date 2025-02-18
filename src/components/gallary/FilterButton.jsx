import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FilterButtons = ({ filters, activeFilters, setActiveFilters }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleFilterClick = (filterId) => {
    setActiveDropdown(activeDropdown === filterId ? null : filterId);
  };

  const handleOptionClick = (filterId, option) => { 
    if (option.startsWith('All')) {
      const newFilters = { ...activeFilters };
      delete newFilters[filterId];
      setActiveFilters(newFilters);
    } else {
      setActiveFilters({
        ...activeFilters,
        [filterId]: option
      });
    }
    setActiveDropdown(null);
  };

  const getFilterLabel = (filter) => {
    if (activeFilters[filter.id]) {
      return activeFilters[filter.id];
    }
    return filter.label;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 my-6">
      {filters.map((filter) => (
        <div key={filter.id} className="relative">
          <button
            onClick={() => handleFilterClick(filter.id)}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg
              font-medium transition-all duration-200
              ${activeFilters[filter.id]
                ? 'bg-blue-600 text-white shadow-lg' 
                : activeDropdown === filter.id
                  ? 'bg-gray-100 text-gray-700 border border-gray-300'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
              }
            `}
          >
            {getFilterLabel(filter)}
            <ChevronDown 
              className={`w-4 h-4 transition-transform duration-200 
                ${activeDropdown === filter.id ? 'rotate-180' : ''}`
              }
            />
          </button>
          
          {/* Dropdown Menu */}
          {activeDropdown === filter.id && (
            <div className="absolute z-10 w-full mt-2 py-2 bg-white rounded-lg shadow-xl border border-gray-200">
              <button
                key={`${filter.id}-all`}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150 font-semibold"
                onClick={() => handleOptionClick(filter.id, filter.label)}
              >
                {filter.label}
              </button>
              {filter.options.map((option) => (
                <button
                  key={option}
                  className={`w-full px-4 py-2 text-left transition-colors duration-150
                    ${activeFilters[filter.id] === option 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`
                  }
                  onClick={() => handleOptionClick(filter.id, option)}
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