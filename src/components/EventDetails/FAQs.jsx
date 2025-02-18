function FAQs() {
    const faqs = [
        {
          question: "What is the registration fee?",
          answer: "Registration is free for all participating teams."
        },
        {
          question: "Is accommodation provided?",
          answer: "Yes, accommodation will be provided for outstation participants during the competition."
        },
        {
          question: "What should we bring?",
          answer: "Participants should bring their own laptops and any required software pre-installed."
        }
      ];
    
      return (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">FAQs</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-medium">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      );
    };
export default FAQs;