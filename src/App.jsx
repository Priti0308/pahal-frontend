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

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/event-details" element={<EventDetails />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/events/:id" element={<EventDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
