import React from 'react';

const WhoShouldJoinSection = () => {
  const targetGroups = [
    {
      title: "Engineering Students",
      description: "Perfect for those passionate about technology and coding"
    },
    {
      title: "Management Students",
      description: "Ideal for future business leaders and strategists"
    },
    {
      title: "Commerce Students",
      description: "Great for those interested in business analytics"
    },
    {
      title: "Arts Students",
      description: "Perfect for creative minds and communication experts"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Who Should Join?
        </h2>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {targetGroups.map((group, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {group.title}
              </h3>
              <p className="text-gray-600">
                {group.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoShouldJoinSection;