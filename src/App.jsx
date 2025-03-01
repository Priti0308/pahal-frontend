import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import EventDetails from "./pages/EventDetail";
import EventList from "./pages/EventList";
import Gallery from "./pages/Gallary";
import Home from "./pages/Home";
import AboutUs from "./pages/About";
import ContactUs from "./pages/ContactUs";
import RegistrationForm from "./pages/RegistrationForm";

// Admin Components
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./components/adminDashboard/Dashboard";
import EventManagement from "./components/adminDashboard/EventManagement";
import UserManagement from "./components/adminDashboard/UserManagement";
import Settings from "./components/adminDashboard/Settings";
import AdminRoute from "./components/adminDashboard/AdminRoute"; // Authentication Wrapper

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        {/* 🌍 Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/events" element={<EventManagement />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/events" element={<Dashboard />} />

        {/* 🔒 Protected Admin Routes */}
        {/* <Route
          path="/admin/"
          element={
            <AdminRoute>
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  
                </Routes>
              </AdminLayout>
            </AdminRoute>
          }
        /> */}
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
