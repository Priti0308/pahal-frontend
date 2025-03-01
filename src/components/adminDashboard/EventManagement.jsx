import { useState, useEffect } from "react";
import axios from "axios";

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", date: "", location: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data } = await axios.get("http://localhost:5000/api/events");
    setEvents(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5000/api/events/${editId}`, form);
    } else {
      await axios.post("http://localhost:5000/api/events", form);
    }
    setForm({ title: "", description: "", date: "", location: "" });
    setEditId(null);
    fetchEvents();
  };

  const handleEdit = (event) => {
    setEditId(event._id);
    setForm(event);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/events/${id}`);
    fetchEvents();
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Event Management</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-4 p-4 bg-gray-100 rounded">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Event Title" className="w-full p-2 border mb-2" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Event Description" className="w-full p-2 border mb-2" required></textarea>
        <input name="date" type="date" value={form.date} onChange={handleChange} className="w-full p-2 border mb-2" required />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Event Location" className="w-full p-2 border mb-2" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">{editId ? "Update" : "Create"} Event</button>
      </form>

      {/* Events List */}
      <div className="grid grid-cols-3 gap-4">
        {events.map(event => (
          <div key={event._id} className="bg-gray-100 p-4 rounded shadow">
            <h3 className="text-lg font-bold">{event.title}</h3>
            <p>{event.description}</p>
            <p className="text-sm">{new Date(event.date).toLocaleDateString()}</p>
            <p className="text-sm">{event.location}</p>
            <button onClick={() => handleEdit(event)} className="bg-yellow-500 text-white px-2 py-1 mr-2">Edit</button>
            <button onClick={() => handleDelete(event._id)} className="bg-red-500 text-white px-2 py-1">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventManagement;
