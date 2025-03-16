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

// Admin Components
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./components/adminDashboard/Dashboard";
import EventManagement from "./components/adminDashboard/EventManagement";
import UserManagement from "./components/adminDashboard/UserManagement";
import Settings from "./components/adminDashboard/Settings";
import AdminEventList from "./components/adminDashboard/AdminEventList";


function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        {/* 🌍 Public Routes */}
       <Route path="/" element={<Home />} /> 
        {/* <Route path="/" element={< Dashboard/>} /> */}
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/about" element={<AboutUs />} />
        {/* <Route path="/contact" element={<ContactUs />} /> */}
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/register" element={<RegistrationForm />} />

        {/* 🔐 Admin Routes - Wrapped with Admin Layout */}
        <Route path="admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="events" element={<EventManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="event-list" element={<AdminEventList />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
