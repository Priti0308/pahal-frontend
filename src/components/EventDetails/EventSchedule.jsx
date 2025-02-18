import React from "react";

function EventSchedule({ event }) {
  if (!event || !event.schedule) return null;
  
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Event Schedule</h3>
      <div className="space-y-4">
        {event.schedule.map((item, index) => (
          <div key={index} className="space-y-1">
            <h4 className="font-medium">{item.round}</h4>
            <p className="text-gray-600 text-sm">{item.date} - {item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventSchedule;