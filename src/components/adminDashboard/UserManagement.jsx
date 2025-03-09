import { useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Organizer" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
  ]);

  const [newUser, setNewUser] = useState({ name: "", email: "", role: "User" });
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on input change
  };

  // Validate form fields
  const validateForm = () => {
    let newErrors = {};
    if (!newUser.name.trim()) newErrors.name = "Name is required";
    if (!newUser.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(newUser.email)) newErrors.email = "Invalid email format";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add a new user
  const handleAddUser = () => {
    if (!validateForm()) return;

    setUsers([...users, { id: users.length + 1, ...newUser }]);
    setNewUser({ name: "", email: "", role: "User" });
  };

  // Delete user
  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>

      {/* Improved Add User Form */}
      <div className="mb-6 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Add New User</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Enter Full Name"
              value={newUser.name}
              onChange={handleChange}
              className={`p-2 border rounded w-full ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              value={newUser.email}
              onChange={handleChange}
              className={`p-2 border rounded w-full ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <select
              name="role"
              value={newUser.role}
              onChange={handleChange}
              className="p-2 border rounded w-full"
            >
              <option value="Admin">Admin</option>
              <option value="Organizer">Organizer</option>
              <option value="User">User</option>
            </select>
          </div>
          <button
            onClick={handleAddUser}
            className="col-span-3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Add User
          </button>
        </div>
      </div>

      {/* User List Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">User List</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3">Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Role</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="border p-3">{user.name}</td>
                <td className="border p-3">{user.email}</td>
                <td className="border p-3">{user.role}</td>
                <td className="border p-3">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
