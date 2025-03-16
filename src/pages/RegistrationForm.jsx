import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../context/constants";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    collegeName: "",
    email: "",
    eventCategory: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/register`, formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-80"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover bg-fixed animate-pulse"
             style={{ backgroundImage: "url('https://source.unsplash.com/random/1920x1080/?abstract')" }}>
        </div>
        {/* Animated Small White Circles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-50 animate-bounce"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          ></div>
        ))}
      </div>
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 backdrop-blur-md bg-opacity-90">
        <h2 className="text-2xl font-bold text-center mb-4">Register For Events</h2>
        {message && <p className="text-center text-green-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">College Name</label>
            <input
              type="text"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Event Category</label>
            <select
              name="eventCategory"
              value={formData.eventCategory}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            >
              <option value="">Select an event</option>
              <option value="Coding Competition">Pahal: Idea Peaching Event</option>
              <option value="Robotics">Add-Mad Show</option>
              <option value="Hackathon">Code-A-Thon (1st time)</option>
              <option value="AI Workshop">Virtual Trading</option>
              <option value="Tech Talk">Captura</option>
              <option value="Hackathon">Quiz</option>
              <option value="AI Workshop">One Minute Game </option>
              <option value="Tech Talk">Treasure Hunt</option>
              <option value="Tech Talk">Volleyboll (1st time)</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-300"
          >
            Submit Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
