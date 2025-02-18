import React from 'react';
import { competitions } from '../../data/competitionData';

const GalleryGrid = ({ activeFilters }) => {
  const filteredCompetitions = competitions.filter(competition => {
    // Apply filters
    for (const [key, value] of Object.entries(activeFilters)) {
      if (key === 'years' && competition.year !== value) return false;
      if (key === 'categories' && competition.category !== value) return false;
      if (key === 'types' && competition.type !== value) return false;
    }
    return true;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8 p-4">
      {filteredCompetitions.length > 0 ? (
        filteredCompetitions.map((competition) => (
          <div 
            key={competition.id} 
            className="group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative">
              <img 
                src={competition.image}
                alt={competition.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {competition.title} ({competition.year})
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-12 text-gray-500">
          No competitions found that match your filters. Try adjusting your selection.
        </div>
      )}
    </div>
  );
};

export default GalleryGrid;