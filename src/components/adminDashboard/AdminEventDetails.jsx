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
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/participants/event/${eventId}`
        );
        setEventData(response.data);
      } catch (err) {
        setError("Failed to load event data. Please try again later.");
        console.error("Error fetching event data:", err);
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
    const confirmText = `Are you sure you want to ${
      action === "accept" ? "accept" : "reject"
    } this team?`;
    if (!window.confirm(confirmText)) return;

    try {
      const endpoint = `${BASE_URL}/participants/${action}/${teamId}`;
      const response = await axios.get(endpoint);
      if (response.status !== 200)
        throw new Error("Server responded with an error status");
 
      setEventData((prev) => ({
        ...prev,
        participants: prev.participants.map((team) =>
          team._id === teamId
            ? {
                ...team,
                status: action === "accept" ? "Accepted" : "Rejected",
                accepted: action === "accept",
              }
            : team
        ),
      }));

      const message =
        action === "accept"
          ? "Team accepted successfully!"
          : "Team rejected successfully!";
      showNotification(message, "success");
    } catch (err) {
      showNotification(
        `Failed to ${action} the team. Please try again.`,
        "error"
      );
      console.error(`Error ${action}ing team:`, err);
    }
  };

  const showNotification = (message, type) => {
    const notification = document.getElementById("notification");
    notification.innerText = message;
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    } text-white transition-opacity duration-500 opacity-100`;

    setTimeout(() => {
      notification.className += " opacity-0";
    }, 3000);
  };

  const downloadAsExcel = () => {
    if (!eventData?.participants?.length) {
      showNotification("No data available to export", "error");
      return;
    }

    try {
      const csvData = eventData.participants.map((team, i) => ({
        "Sr No": i + 1,
        "Team Name": team.teamName,
        "Leader Name": team.teamLeader.name,
        "Leader Email": team.teamLeader.email,
        "Leader Phone": team.teamLeader.phone || "N/A",
        "Registration Date": new Date(team.registrationDate).toLocaleString(),
        "Status": team.accepted ? "Accepted" : "Pending",
        "Total Members": team.teamMembers.length,
        "Member Details": team.teamMembers
          .map((m) => `${m.name} (${m.email}) - ${m.college || "N/A"}`)
          .join("; "),
      }));

      const ws = XLSX.utils.json_to_sheet(csvData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Participants");
      XLSX.writeFile(
        wb,
        `${
          eventData.event.title
        }_Participants_${new Date().toLocaleDateString()}.xlsx`
      );

      showNotification("Excel file downloaded successfully!", "success");
    } catch (err) {
      showNotification("Failed to download Excel file", "error");
      console.error("Error downloading Excel:", err);
    }
  };

 const getStats = () => {
  if (!eventData?.participants) return {};
  
  const totalTeams = eventData.participants.length;
  const acceptedTeams = eventData.participants.filter(team => team.accepted).length; 
  const pendingTeams = totalTeams - acceptedTeams;  

    const totalMembers = eventData.participants.reduce(
      (acc, team) => acc + team.teamMembers.length + 1,  
      0
    );

    const collegeSet = new Set();
    eventData.participants.forEach((team) => {
      if (team.teamLeader.college) collegeSet.add(team.teamLeader.college);
      team.teamMembers.forEach((member) => {
        if (member.college) collegeSet.add(member.college);
      });
    });

    const sorted = [...eventData.participants].sort(
      (a, b) => new Date(b.registrationDate) - new Date(a.registrationDate)
    );

    const latestRegistration = sorted.length
      ? new Date(sorted[0].registrationDate).toLocaleDateString()
      : "N/A";

    return {
      totalTeams,
      acceptedTeams,
      pendingTeams,
      totalMembers,
      uniqueColleges: collegeSet.size,
      latestRegistration,
    };
  };

  const filteredParticipants = () => {
    if (!eventData?.participants) return [];

    switch (filterStatus) {
      case "pending":
        return eventData.participants.filter((team) => !team.accepted); 
      case "accepted":
        return eventData.participants.filter((team) => team.accepted); 
      default:
        return eventData.participants;
    }
  };
  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <svg
            className="h-16 w-16 text-red-500 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const displayedParticipants = filteredParticipants();

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Notification */}
      <div
        id="notification"
        className="fixed top-4 right-4 p-4 rounded-lg shadow-lg bg-green-500 text-white opacity-0 transition-opacity duration-500"
      ></div>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-8 shadow-md">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                {eventData?.event?.title || "Event Details"}
              </h1>
              <p className="text-blue-100 mt-1">
                {eventData?.event?.date || "Date not available"}
              </p>
              <p className="text-blue-100 mt-1">
                {eventData?.event?.location || ""}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={downloadAsExcel}
                className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded shadow transition duration-300 flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Export to Excel
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <StatCard
            title="Total Teams"
            value={stats.totalTeams}
            icon="users"
            color="blue"
          />
          <StatCard
            title="Accepted"
            value={stats.acceptedTeams}
            icon="check"
            color="green"
          />
          <StatCard
            title="Pending"
            value={stats.pendingTeams}
            icon="clock"
            color="yellow"
          />
          <StatCard
            title="Total Participants"
            value={stats.totalMembers}
            icon="user"
            color="indigo"
          />
          <StatCard
            title="Unique Colleges"
            value={stats.uniqueColleges}
            icon="academic-cap"
            color="purple"
          />
          <StatCard
            title="Latest Registration"
            value={stats.latestRegistration}
            icon="calendar"
            color="pink"
            isText
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-gray-800">
              Team Registrations
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Filter by status:</span>
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => setFilterStatus("all")}
                  className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                    filterStatus === "all"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  } border border-gray-300`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterStatus("accepted")}
                  className={`px-4 py-2 text-sm font-medium ${
                    filterStatus === "accepted"
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  } border-t border-b border-r border-gray-300`}
                >
                  Accepted
                </button>
                <button
                  onClick={() => setFilterStatus("pending")}
                  className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                    filterStatus === "pending"
                      ? "bg-yellow-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  } border border-gray-300`}
                >
                  Pending
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {displayedParticipants.length === 0 ? (
            <div className="p-8 text-center">
              <svg
                className="h-16 w-16 text-gray-400 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mb-1">
                No teams found
              </h3>
              <p className="text-gray-500">
                {filterStatus !== "all"
                  ? `No ${filterStatus} teams available for this event.`
                  : "There are no team registrations for this event yet."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Team
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Leader
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Members
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Registration Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayedParticipants.map((team) => (
                    <React.Fragment key={team._id}>
                      <tr className="hover:bg-gray-50 transition duration-150">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-800">
                            {team.teamName}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-800">
                            {team.teamLeader.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {team.teamLeader.email}
                          </div>
                          {team.teamLeader.phone && (
                            <div className="text-sm text-gray-500">
                              {team.teamLeader.phone}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {team.teamMembers.length}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(team.registrationDate).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                              team.accepted
                                ? "bg-green-100 text-green-800"  
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {team.accepted ? "Accepted" : "Pending"} 
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => toggleTeamExpanded(team._id)}
                              className="text-blue-600 hover:text-blue-800 transition duration-150"
                            >
                              {expandedTeams[team._id] ? "Hide" : "Details"}
                            </button>
                            {!team.accepted && ( 
                              <button
                                onClick={() =>
                                  handleAcceptReject(team._id, "accept")
                                }
                                className="text-green-600 hover:text-green-800 transition duration-150"
                              >
                                Accept
                              </button>
                            )}
                            {team.accepted && ( 
                              <button
                                onClick={() =>
                                  handleAcceptReject(team._id, "reject")
                                }
                                className="text-red-600 hover:text-red-800 transition duration-150"
                              >
                                Reject
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                      {expandedTeams[team._id] && (
                        <tr>
                          <td
                            colSpan="6"
                            className="px-6 py-4 bg-gray-50 border-b"
                          >
                            <div className="space-y-4">
                              <div className="flex items-center space-x-2">
                                <h4 className="font-semibold text-gray-800">
                                  Team Members
                                </h4>
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                  {team.teamMembers.length}
                                </span>
                              </div>

                              {team.teamMembers.length === 0 ? (
                                <p className="text-sm text-gray-500">
                                  No additional members
                                </p>
                              ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {team.teamMembers.map((member) => (
                                    <div
                                      key={member._id}
                                      className="p-4 bg-white border rounded-lg shadow-sm hover:shadow transition duration-150"
                                    >
                                      <div className="font-medium text-gray-800">
                                        {member.name}
                                      </div>
                                      <div className="text-sm text-gray-500">
                                        {member.email}
                                      </div>
                                      {member.phone && (
                                        <div className="text-sm text-gray-500">
                                          {member.phone}
                                        </div>
                                      )}
                                      <div className="text-sm text-gray-500 mt-1">
                                        College:{" "}
                                        {member.college || "Not specified"}
                                      </div>
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
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color, isText = false }) {
  const getIconSVG = (iconName) => {
    switch (iconName) {
      case "users":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        );
      case "check":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      case "clock":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "user":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        );
      case "academic-cap":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
            />
          </svg>
        );
      case "calendar":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const colorClasses = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    yellow: "bg-yellow-50 text-yellow-700",
    indigo: "bg-indigo-50 text-indigo-700",
    purple: "bg-purple-50 text-purple-700",
    pink: "bg-pink-50 text-pink-700",
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transition duration-300">
      <div className={`p-3 rounded-full ${colorClasses[color]} mb-4`}>
        {getIconSVG(icon)}
      </div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p
        className={`text-2xl font-bold ${
          isText ? "text-gray-700 text-lg" : `text-${color}-600`
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default AdminEventDetails;
