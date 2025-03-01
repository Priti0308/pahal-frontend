import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = ({ isAdmin }) => {
  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
