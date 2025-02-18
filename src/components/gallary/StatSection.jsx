function StatsSection() {
    const stats = [
      { number: "150+", label: "Events Organized" },
      { number: "5000+", label: "Participants" },
      { number: "30+", label: "Partner Colleges" }
    ];
  
    return (
      <div className="flex justify-center gap-8 my-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-3xl font-bold">{stat.number}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    );
  }
  
  export default StatsSection;
  