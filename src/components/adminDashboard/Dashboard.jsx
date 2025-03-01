import Sidebar from "./Sidebar";
import EventManagement from "./EventManagement";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <EventManagement />
      </div>
    </div>
  );
};

export default Dashboard;
