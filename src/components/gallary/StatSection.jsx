import React from 'react';
import { competitions } from '../../data/competitionData';

function StatsSection({ activeFilters }) {
  // Calculate stats based on filtered competitions
  const filteredCompetitions = competitions.filter(competition => {
    // Apply filters
    for (const [key, value] of Object.entries(activeFilters)) {
      if (key === 'years' && competition.year !== value) return false;
      if (key === 'categories' && competition.category !== value) return false;
      if (key === 'types' && competition.type !== value) return false;
    }
    return true;
  });

  const totalEvents = filteredCompetitions.length;
  const totalParticipants = filteredCompetitions.reduce((sum, comp) => sum + comp.participants, 0);
  
  // Get unique colleges
  const uniqueColleges = new Set();
  filteredCompetitions.forEach(comp => {
    // Assuming each competition has its own unique colleges
    for (let i = 0; i < comp.colleges; i++) {
      uniqueColleges.add(`college-${comp.id}-${i}`);
    }
  });
  const totalColleges = uniqueColleges.size;

  const stats = [
    { number: totalEvents > 0 ? `${totalEvents}` : "0", label: "Events Organized" },
    { number: totalParticipants > 0 ? `${totalParticipants}+` : "0", label: "Participants" },
    { number: totalColleges > 0 ? `${totalColleges}+` : "0", label: "Partner Colleges" }
  ];

  return (
    <div className="flex justify-center gap-8 my-8">
      {stats.map((stat, index) => (
        <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-3xl font-bold">{stat.number}</h3>
          <p className="text-gray-600">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

export default StatsSection;