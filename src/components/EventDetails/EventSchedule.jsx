function EventSchedule({ event }) {
    const schedule = [
        {
          round: "Round 1: Online Qualification",
          date: "March 15, 2024",
          description: "Online coding challenge to test algorithmic skills"
        },
        {
          round: "Round 2: Project Development",
          date: "March 16, 2024",
          description: "24-hour hackathon to build innovative solutions"
        },
        {
          round: "Round 3: Final Presentation",
          date: "March 17, 2024",
          description: "Project demonstration and judging"
        }
      ];
    
      return (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Event Schedule</h3>
          <div className="space-y-4">
            {schedule.map((item, index) => (
              <div key={index} className="space-y-1">
                <h4 className="font-medium">{item.round}</h4>
                <p className="text-gray-600 text-sm">{item.date} - {item.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    };
export default EventSchedule;    