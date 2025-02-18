function EventList() {
  const events = [
    {
        id: 1,
        title: "Code Odyssey",
        category: "Software Development",
        date: "March 15-17, 2024",
        description: "CIMDR's flagship software development competition that brings together the brightest minds from colleges across India.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
        location: "Main Campus, Technology Building",
        attendees: 250,
        registrationFee: "$25",
        prizes: ["$3000 First Prize", "$1500 Second Prize", "$750 Third Prize"],
        sponsors: ["TechCorp", "DevInnovate", "CodeMasters"]
      },
      {
        id: 2,
        title: "Hackathon 2024",
        category: "Hackathon",
        date: "April 20-22, 2024",
        description: "24-hour hackathon to build innovative solutions and compete for exciting prizes.",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
        location: "Innovation Hub, Floor 3",
        attendees: 180,
        registrationFee: "$15",
        prizes: ["$2000 First Prize", "$1000 Second Prize", "$500 Third Prize"],
        sponsors: ["InnovateTech", "DevLabs", "TechStartup"]
      },
      {
        id: 3,
        title: "Business Strategy Summit",
        category: "Management",
        date: "May 25-27, 2024",
        description: "Showcase your business acumen through case studies, presentations, and strategic planning challenges.",
        image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2069&auto=format&fit=crop",
        location: "Business School Auditorium",
        attendees: 300,
        registrationFee: "$35",
        prizes: ["$4000 First Prize", "$2000 Second Prize", "$1000 Third Prize"],
        sponsors: ["Global Business Inc.", "Strategy Partners", "Management Solutions"]
      },
      {
        id: 4,
        title: "AI & Machine Learning Expo",
        category: "Technology",
        date: "June 10-12, 2024",
        description: "Explore the cutting-edge developments in artificial intelligence and machine learning through workshops, demos, and competitions.",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070&auto=format&fit=crop",
        location: "Science Complex, Hall A",
        attendees: 400,
        registrationFee: "$40",
        prizes: ["$5000 First Prize", "$2500 Second Prize", "$1250 Third Prize"],
        sponsors: ["AI Solutions", "DataTech", "Neural Networks Inc."]
      },
      {
        id: 5,
        title: "Design Thinking Workshop",
        category: "Design",
        date: "July 5-7, 2024",
        description: "Learn the principles of design thinking and apply them to solve real-world problems through collaborative workshops.",
        image: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop",
        location: "Creative Arts Building, Studio 5",
        attendees: 120,
        registrationFee: "$30",
        prizes: ["$1500 First Prize", "$750 Second Prize", "$500 Third Prize"],
        sponsors: ["DesignMasters", "Creative Solutions", "ArtTech"]
      }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
          Upcoming Events
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Explore our exciting lineup of competitions and activities
        </p>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md"
            >
              {/* Event Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Event Meta */}
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-blue-700">
                    {event.category}
                  </span>
                  <span className="text-sm text-gray-500">{event.date}</span>
                </div>

                {/* Event Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {event.title}
                </h3>

                {/* Event Description */}
                <p className="text-gray-600 mb-6">{event.description}</p>

                {/* Register Button */}
                <div className="mt-auto">
                  <button className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition duration-300">
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default EventList;
