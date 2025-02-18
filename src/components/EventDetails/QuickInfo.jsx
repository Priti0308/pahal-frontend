import React from 'react';
import { Users, Trophy, Calendar, GraduationCap } from 'lucide-react';

function QuickInfo({ event }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Quick Info</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-gray-600" />
              <span>Team Size: 2-4 members</span>
            </div>
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-gray-600" />
              <span>Prize Pool: ₹50,000</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-600" />
              <span>Duration: 3 days</span>
            </div>
            <div className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-gray-600" />
              <span>Open to all colleges</span>
            </div>
          </div>
        </div>
      );
    };
export default QuickInfo;