import React from "react";

function Guidelines({ event }) {
  if (!event || !event.guidelines) return null;
  
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Guidelines</h3>
      <ul className="list-disc list-inside space-y-2">
        {event.guidelines.map((rule, index) => (
          <li key={index} className="text-gray-700">{rule}</li>
        ))}
      </ul>
    </div>
  );
}

export default Guidelines;