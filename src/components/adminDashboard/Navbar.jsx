const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="text-xl font-semibold">Admin Panel</h1>
      <button className="bg-red-500 px-4 py-2 rounded">Logout</button>
    </nav>
  );
};

export default Navbar;
