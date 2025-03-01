import Sidebar from "../components/adminDashboard/Sidebar";
import Navbar from "../components/adminDashboard/Navbar";

const AdminLayout = ({ children }) => {
  console.log("AdminLayout Loaded"); // Debugging log
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// Explicit default export
export default AdminLayout;
