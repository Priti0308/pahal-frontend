import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <ul>
        <li className="mb-2">
          <Link to="/admin/events" className="block px-4 py-2 hover:bg-gray-700 rounded">
            Manage Events
          </Link>
          <Link to="/admin/user" className="block px-4 py-2 hover:bg-gray-700 rounded">
            User Managment Events
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
