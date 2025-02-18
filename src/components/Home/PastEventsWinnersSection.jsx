import React from 'react';
import logo from "../../assets/logo.png";
const PastEventsWinnersSection = () => {
  const pastEvents = [
    {
      id: 1,
      title: "Code Quest 2023",
      images: [
        logo,
        logo,
      ],
      winners: [
        { place: "🥇 First Place", team: "Team CodeMasters - MIT" },
        { place: "🥈 Second Place", team: "Binary Brains - BITS" },
        { place: "🥉 Third Place", team: "Tech Titans - IIT" },
      ]
    },
    {
      id: 2,
      title: "Business Strategy Summit 2023",
      images: [
        logo,
        logo,
      ],
      winners: [
        { place: "🥇 First Place", team: "Strategy Squad - IIM" },
        { place: "🥈 Second Place", team: "Business Elite - XLRI" },
        { place: "🥉 Third Place", team: "Market Masters - ISB" },
      ]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Past Events & Winners
          </h2>
          <p className="text-gray-600">
            Celebrating our champions and their achievements
          </p>
        </div>

        {/* Past Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {pastEvents.map((event) => (
            <div key={event.id} className="space-y-6">
              {/* Event Title */}
              <h3 className="text-2xl font-semibold text-gray-900">
                {event.title}
              </h3>

              {/* Event Images */}
              <div className="grid grid-cols-2 gap-4">
                {event.images.map((image, index) => (
                  <div key={index} className="rounded-lg overflow-hidden shadow-md">
                    <img
                      src={image}
                      alt={`${event.title} ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Winners Box */}
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <h4 className="text-lg font-medium text-gray-900 mb-4">
                  Winners
                </h4>
                <ul className="space-y-3">
                  {event.winners.map((winner, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span className="text-gray-700">{winner.place}</span>
                      <span className="text-gray-900 font-medium">{winner.team}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <button className="px-8 py-3 bg-black text-white font-medium rounded hover:bg-gray-800 transition duration-300">
            View More Past Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default PastEventsWinnersSection;