import React from 'react';

const PrizesRecognitionSection = () => {
  const prizes = [
    {
      id: 1,
      amount: "₹50,000",
      position: "First Prize",
      benefits: [
        "Cash Prize",
        "Internship Opportunity",
        "Winner's Trophy"
      ]
    },
    {
      id: 2,
      amount: "₹30,000",
      position: "Second Prize",
      benefits: [
        "Cash Prize",
        "Industry Mentorship",
        "Runner-up Trophy"
      ]
    },
    {
      id: 3,
      amount: "₹20,000",
      position: "Third Prize",
      benefits: [
        "Cash Prize",
        "Certificate of Excellence",
        "Special Recognition"
      ]
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Prizes & Recognition
          </h2>
          <p className="text-gray-600">
            Win amazing prizes and get recognized for your talent
          </p>
        </div>

        {/* Prizes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {prizes.map((prize) => (
            <div
              key={prize.id}
              className="bg-white p-8 rounded-lg shadow-sm text-center"
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {prize.amount}
              </h3>
              <p className="text-lg font-medium text-gray-800 mb-6 pb-4 border-b border-gray-200">
                {prize.position}
              </p>
              <ul className="space-y-3">
                {prize.benefits.map((benefit, index) => (
                  <li key={index} className="text-gray-600">
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrizesRecognitionSection;