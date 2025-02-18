import React from 'react';
import { Users, Trophy, Calendar, GraduationCap } from 'lucide-react';

function QuickInfo({ event }) {
  if (!event || !event.quickInfo) return null;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Quick Info</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-gray-600" />
          <span>Team Size: {event.quickInfo.teamSize}</span>
        </div>
        <div className="flex items-center gap-3">
          <Trophy className="w-5 h-5 text-gray-600" />
          <span>Prize Pool: {event.quickInfo.prizePool}</span>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-gray-600" />
          <span>Duration: {event.quickInfo.duration}</span>
        </div>
        <div className="flex items-center gap-3">
          <GraduationCap className="w-5 h-5 text-gray-600" />
          <span>{event.quickInfo.eligibility}</span>
        </div>
      </div>
    </div>
  );
}

export default QuickInfo;