import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AdminEventDetails() {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedTeams, setExpandedTeams] = useState({});

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/participants/event/${eventId}`);
        setEventData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch event data. Please try again later.");
        setLoading(false);
        console.error("Error fetching event data:", err);
      }
    };

    fetchEventData();
  }, [eventId]);

  const toggleTeamExpanded = (teamId) => {
    setExpandedTeams(prev => ({
      ...prev,
      [teamId]: !prev[teamId]
    }));
  };

  // Calculate statistics
  const getStats = () => {
    if (!eventData) return {};
    
    const totalTeams = eventData.participants.length;
    const totalMembers = eventData.participants.reduce((acc, team) => 
      acc + 1 + (team.teamMembers ? team.teamMembers.length : 0), 0);
    
    const collegeMap = new Map();
    eventData.participants.forEach(team => {
      team.teamMembers.forEach(member => {
        if (member.college) {
          collegeMap.set(member.college, (collegeMap.get(member.college) || 0) + 1);
        }
      });
    });
    
    const uniqueColleges = collegeMap.size;
     
    const sortedDates = [...eventData.participants].sort((a, b) => 
      new Date(b.registrationDate) - new Date(a.registrationDate));
    const latestRegistration = sortedDates.length > 0 ? new Date(sortedDates[0].registrationDate).toLocaleDateString() : "N/A";
    
    return {
      totalTeams,
      totalMembers,
      uniqueColleges,
      latestRegistration
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  const stats = getStats();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Event Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 mb-8 text-white">
        <h1 className="text-3xl font-bold">{eventData?.event?.title || "Event Details"}</h1>
        <p className="text-xl mt-2">{eventData?.event?.date || "Date not specified"}</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm font-medium">TOTAL TEAMS</h3>
          <p className="text-3xl font-bold text-gray-700">{stats.totalTeams}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm font-medium">TOTAL PARTICIPANTS</h3>
          <p className="text-3xl font-bold text-gray-700">{stats.totalMembers}</p>
        </div>
       
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <h3 className="text-gray-500 text-sm font-medium">LATEST REGISTRATION</h3>
          <p className="text-lg font-bold text-gray-700">{stats.latestRegistration}</p>
        </div>
      </div>

      {/* Teams List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">Registered Teams</h2>
        </div>
        
        
        {/* Teams Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team Leader
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Members
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registration Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {eventData?.participants?.map((team) => (
                <React.Fragment key={team._id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{team.teamName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{team.teamLeader.name}</div>
                      <div className="text-sm text-gray-500">{team.teamLeader.email}</div>
                      <div className="text-sm text-gray-500">{team.teamLeader.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{team.teamMembers.length} member(s)</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(team.registrationDate).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleTeamExpanded(team._id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          {expandedTeams[team._id] ? 'Hide Details' : 'Show Details'}
                        </button>
                       
                      </div>
                    </td>
                  </tr>
                  
                  {/* Expanded Team Details */}
                  {expandedTeams[team._id] && (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 bg-gray-50">
                        <div className="rounded-lg border border-gray-200 p-4">
                          <h4 className="font-medium text-lg mb-2">Team Members</h4>
                          
                          {team.teamMembers.length === 0 ? (
                            <p className="text-gray-500 italic">No additional team members</p>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {team.teamMembers.map((member) => (
                                <div key={member._id} className="bg-white rounded p-3 border border-gray-200">
                                  <div className="font-medium">{member.name}</div>
                                  <div className="text-sm text-gray-500">{member.email}</div>
                                  <div className="text-sm text-gray-500">College: {member.college || 'Not specified'}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        
         
      </div>
    </div>
  );
}

export default AdminEventDetails; 