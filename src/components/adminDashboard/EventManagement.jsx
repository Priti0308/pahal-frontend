import { useState } from "react";

const EventManagement = ({ addEvent }) => {
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    organizer: "",
    category: "Conference",
    ticketPrice: "Free",
    maxParticipants: "",
    banner: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setEventData((prev) => ({ ...prev, banner: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent(eventData);
    setEventData({
      title: "",
      date: "",
      location: "",
      description: "",
      organizer: "",
      category: "Conference",
      ticketPrice: "Free",
      maxParticipants: "",
      banner: null,
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          value={eventData.title}
          onChange={handleChange}
          placeholder="Event Title"
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="location"
          value={eventData.location}
          onChange={handleChange}
          placeholder="Location"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="organizer"
          value={eventData.organizer}
          onChange={handleChange}
          placeholder="Organizer Name"
          className="border p-2 rounded"
          required
        />
        <select
          name="category"
          value={eventData.category}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="Conference">Conference</option>
          <option value="Workshop">Workshop</option>
          <option value="Meetup">Meetup</option>
          <option value="Exhibition">Exhibition</option>
        </select>
        <select
          name="ticketPrice"
          value={eventData.ticketPrice}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="Free">Free</option>
          <option value="Paid">Paid</option>
        </select>
        {eventData.ticketPrice === "Paid" && (
          <input
            type="number"
            name="ticketPrice"
            value={eventData.ticketPrice}
            onChange={handleChange}
            placeholder="Ticket Price"
            className="border p-2 rounded"
          />
        )}
        <input
          type="number"
          name="maxParticipants"
          value={eventData.maxParticipants}
          onChange={handleChange}
          placeholder="Max Participants"
          className="border p-2 rounded"
          required
        />
        <input
          type="file"
          name="banner"
          onChange={handleFileChange}
          className="border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={eventData.description}
          onChange={handleChange}
          placeholder="Event Description"
          className="border p-2 rounded col-span-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded col-span-2">
          + Add Event
        </button>
      </form>
    </div>
  );
};

export default EventManagement;
