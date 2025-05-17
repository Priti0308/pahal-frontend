import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";
import { BASE_URL } from "../../context/constants";

function AdminEventDetails() {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedTeams, setExpandedTeams] = useState({});

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/participants/event/${eventId}`);
        setEventData(response.data);
      } catch (err) {
        setError("Failed to load event data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEventData();
  }, [eventId]);

  const toggleTeamExpanded = (teamId) => {
    setExpandedTeams((prev) => ({ ...prev, [teamId]: !prev[teamId] }));
  };

  const handleAcceptReject = async (teamId, action) => {
    const confirmText = `Are you sure you want to ${action} this team?`;
    if (!window.confirm(confirmText)) return;

    try {
      const endpoint = `${BASE_URL}/participants/${action}/${teamId}`;
      const response = await axios.get(endpoint);
      if (response.status !== 200) throw new Error();

      // Optimistically update the UI
      setEventData((prev) => ({
        ...prev,
        participants: prev.participants.map((team) =>
          team._id === teamId ? { ...team, status: action === "accept" ? "Accepted" : "Rejected", accepted: action === "accept" } : team
        ),
      }));

      alert(`Team ${action === "accept" ? "accepted" : "rejected"} successfully.`);
    } catch (err) {
      alert(`Failed to ${action} the team.`);
      console.error(err);
    }
  };

  const downloadAsCSV = () => {
    if (!eventData?.participants) return;

    const csvData = eventData.participants.map((team, i) => ({
      "Sr No": i + 1,
      "Team Name": team.teamName,
      "Leader Name": team.teamLeader.name,
      "Leader Email": team.teamLeader.email,
      "Leader Phone": team.teamLeader.phone,
      "Registration Date": new Date(team.registrationDate).toLocaleString(),
      "Total Members": team.teamMembers.length,
      "Member Details": team.teamMembers
        .map((m) => `${m.name} (${m.email}) - ${m.college || "N/A"}`)
        .join("; "),
    }));

    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Participants");
    XLSX.writeFile(wb, `${eventData.event.title}_Participants.xlsx`);
  };

  const getStats = () => {
    if (!eventData) return {};
    const totalTeams = eventData.participants.length;
    const totalMembers = eventData.participants.reduce(
      (acc, team) => acc + team.teamMembers.length + 1,
      0
    );

    const collegeSet = new Set();
    eventData.participants.forEach((team) =>
      team.teamMembers.forEach((member) => member.college && collegeSet.add(member.college))
    );

    const sorted = [...eventData.participants].sort(
      (a, b) => new Date(b.registrationDate) - new Date(a.registrationDate)
    );
    const latestRegistration = sorted.length
      ? new Date(sorted[0].registrationDate).toLocaleDateString()
      : "N/A";

    return {
      totalTeams,
      totalMembers,
      uniqueColleges: collegeSet.size,
      latestRegistration,
    };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{eventData?.event?.title}</h1>
            <p className="text-sm">{eventData?.event?.date}</p>
          </div>
          <button
            onClick={downloadAsCSV}
            className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded"
          >
            Export to Excel
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Teams" value={stats.totalTeams} />
        <StatCard title="Total Participants" value={stats.totalMembers} />
        <StatCard title="Unique Colleges" value={stats.uniqueColleges} />
        <StatCard title="Latest Registration" value={stats.latestRegistration} />
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Team", "Leader", "Members", "Date", "Status", "Actions"].map((head) => (
                <th key={head} className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {eventData?.participants?.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No registered teams yet.
                </td>
              </tr>
            ) : (
              eventData.participants.map((team) => (
                <React.Fragment key={team._id}>
                  <tr>
                    <td className="px-6 py-4 font-semibold">{team.teamName}</td>
                    <td className="px-6 py-4">
                      <div>{team.teamLeader.name}</div>
                      <div className="text-sm text-gray-500">{team.teamLeader.email}</div>
                    </td>
                    <td className="px-6 py-4">{team.teamMembers.length}</td>
                    <td className="px-6 py-4">{new Date(team.registrationDate).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          team.status === "Accepted"
                            ? "bg-green-100 text-green-800"
                            : team.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {team.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => toggleTeamExpanded(team._id)}
                        className="text-blue-600 hover:underline"
                      >
                        {expandedTeams[team._id] ? "Hide" : "Details"}
                      </button>
                      <button
                        onClick={() => handleAcceptReject(team._id, "accept")}
                        className="text-green-600 hover:underline"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleAcceptReject(team._id, "reject")}
                        className="text-red-600 hover:underline"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                  {expandedTeams[team._id] && (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 bg-gray-50">
                        <div>
                          <h4 className="font-semibold mb-2">Team Members</h4>
                          {team.teamMembers.length === 0 ? (
                            <p className="text-sm text-gray-500">No additional members.</p>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                              {team.teamMembers.map((m) => (
                                <div key={m._id} className="p-3 border rounded shadow-sm">
                                  <p className="font-medium">{m.name}</p>
                                  <p className="text-sm text-gray-500">{m.email}</p>
                                  <p className="text-sm text-gray-400">College: {m.college || "N/A"}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
}

export default AdminEventDetails;
