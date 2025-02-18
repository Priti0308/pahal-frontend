import React from "react";

function FAQs({ event }) {
  if (!event || !event.faqs) return null;
  
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">FAQs</h3>
      <div className="space-y-4">
        {event.faqs.map((faq, index) => (
          <div key={index} className="space-y-2">
            <h4 className="font-medium">{faq.question}</h4>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQs;