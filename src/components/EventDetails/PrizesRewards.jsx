import React from "react";
import { Trophy, Medal, Award } from "lucide-react";

// Map icon strings to Lucide components
const iconMap = {
  Trophy: Trophy,
  Medal: Medal,
  Award: Award
};

const PrizesRewards = ({ event }) => {
  if (!event || !event.prizes) return null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-6">🏆 Prizes & Rewards</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {event.prizes.map((prize, index) => {
          const IconComponent = iconMap[prize.icon];
          
          return (
            <div
              key={index}
              className="flex flex-col items-center p-6 border rounded-lg shadow-md transition-all hover:shadow-lg"
            >
              {IconComponent && <IconComponent className={`w-10 h-10 ${prize.color}`} />}
              <h3 className="text-lg font-semibold mt-3">{prize.title}</h3>
              <p className="text-2xl font-bold mt-2">{prize.amount}</p>
              <p className="text-gray-600 text-sm mt-1">{prize.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrizesRewards;