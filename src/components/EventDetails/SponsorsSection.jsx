import React from "react";

const SponsorsSection = ({ event }) => {
  if (!event || !event.sponsors) return null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Section Heading */}
      <h2 className="text-2xl font-bold mb-6">🏅 Our Elite Sponsors</h2>

      {/* Sponsors Container */}
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center text-center">
          {event.sponsors.map((sponsor, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={sponsor.image}
                alt={sponsor.name}
                className="w-24 h-24 object-contain rounded-md"
              />
              <p className="mt-2 text-sm font-medium">{sponsor.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sponsorship Info */}
      <p className="mt-6 text-center text-gray-600">
        Interested in sponsoring?{" "}
        <a href="/sponsorship-prospectus.pdf" className="text-blue-600 font-semibold hover:underline">
          Download our sponsorship prospectus
        </a>
      </p>
    </div>
  );
};

export default SponsorsSection;
