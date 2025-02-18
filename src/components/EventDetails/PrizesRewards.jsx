import React from "react";
import { Trophy, Medal, Award } from "lucide-react";

const prizes = [
  {
    title: "First Prize",
    amount: "₹25,000",
    description: "Plus certification",
    icon: <Trophy className="w-10 h-10 text-yellow-500" />,
  },
  {
    title: "Second Prize",
    amount: "₹15,000",
    description: "Plus certification",
    icon: <Medal className="w-10 h-10 text-gray-500" />,
  },
  {
    title: "Third Prize",
    amount: "₹10,000",
    description: "Plus certification",
    icon: <Award className="w-10 h-10 text-orange-500" />,
  },
];

const PrizesRewards = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-6">🏆 Prizes & Rewards</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {prizes.map((prize, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 border rounded-lg shadow-md transition-all hover:shadow-lg"
          >
            {prize.icon}
            <h3 className="text-lg font-semibold mt-3">{prize.title}</h3>
            <p className="text-2xl font-bold mt-2">{prize.amount}</p>
            <p className="text-gray-600 text-sm mt-1">{prize.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrizesRewards;
