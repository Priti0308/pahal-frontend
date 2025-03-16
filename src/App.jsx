import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import EventDetails from "./pages/EventDetail";
import EventList from "./pages/EventList";
import Gallery from "./pages/Gallary";
import Home from "./pages/Home";
import AboutUs from "./pages/About";
import RegistrationForm from "./pages/RegistrationForm";
import Login from "./pages/Login"; 
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Admin Components
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./components/adminDashboard/Dashboard";
import EventManagement from "./components/adminDashboard/EventManagement";
import UserManagement from "./components/adminDashboard/UserManagement";
import Settings from "./components/adminDashboard/Settings";
import AdminEventList from "./components/adminDashboard/AdminEventList";
import AdminEventDetails from "./components/adminDashboard/AdminEventDetails";
import CreateEventForm from "./components/adminDashboard/CreateEventForm";
import ManageEvents from "./components/adminDashboard/ManageEvents";
import EditEventForm from "./components/adminDashboard/EditEventForm";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          {/* Only show Header on non-admin routes */}
          <Routes>
            <Route path="/admin/*" element={null} />
            <Route path="*" element={<Header />} />
          </Routes>
          
          <main className="flex-grow">
            <Routes>
              {/* 🌍 Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/events" element={<EventList />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/login" element={<Login />} />

              {/* Redirect /admin to /admin/dashboard */}
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

              {/* 🔐 Admin Routes - Protected with Authentication */}
              <Route element={<ProtectedRoute />}>
                <Route path="/admin/*" element={<AdminLayout />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="events" element={<EventManagement />} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="create-event" element={<CreateEventForm />} />
                  <Route path="manage-events" element={<ManageEvents />} />
                  <Route path="events/:id" element={<EventDetails />} />
                  <Route path="event-list" element={<AdminEventList />} />
                  <Route path="events-user/:eventId" element={<AdminEventDetails />} />
                  <Route path="edit-event/:eventId" element={<EditEventForm />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Route>
              
              {/* 404 Route */}
              <Route path="*" element={<div className="flex items-center justify-center h-screen">Page not found</div>} />
            </Routes>
          </main>
          
          {/* Only show Footer on non-admin routes */}
          <Routes>
            <Route path="/admin/*" element={null} />
            <Route path="*" element={<Footer />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;