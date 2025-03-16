import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          {/* 🌍 Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<Login />} />

          {/* 🔐 Admin Routes - Protected with Authentication */}
          <Route element={<ProtectedRoute />}>
            <Route path="admin" element={<AdminLayout />}>
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
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;