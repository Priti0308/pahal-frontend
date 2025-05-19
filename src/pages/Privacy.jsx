import React from 'react';

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
      
      <div className="space-y-8 bg-white p-8 rounded-lg shadow-md">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Information We Collect</h2>
          <div className="space-y-3 text-gray-700">
            <p>We collect the following types of information:</p>
            <ul className="list-disc list-inside pl-4 space-y-2">
              <li>Name and contact information</li>
              <li>Academic details and qualifications</li>
              <li>Event participation history</li>
              <li>Payment information (when applicable)</li>
              <li>Feedback and survey responses</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">How We Use Your Information</h2>
          <div className="space-y-3 text-gray-700">
            <p>Your information is used for:</p>
            <ul className="list-disc list-inside pl-4 space-y-2">
              <li>Processing event registrations</li>
              <li>Communicating about events and updates</li>
              <li>Improving our services and user experience</li>
              <li>Administrative and academic purposes</li>
              <li>Legal compliance</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Data Security</h2>
          <p className="text-gray-700 leading-relaxed">
            We implement appropriate security measures to protect your personal information from 
            unauthorized access, alteration, disclosure, or destruction. Your data is handled with 
            utmost confidentiality and in accordance with applicable data protection laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Information Sharing</h2>
          <p className="text-gray-700 leading-relaxed">
            We do not sell, trade, or rent your personal information to third parties. Information 
            may be shared with event organizers, academic partners, or as required by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            For any questions about this Privacy Policy, please contact us at:{' '}
            <a href="mailto:office.cimdr@despune.org" className="text-blue-600 hover:underline">
              office.cimdr@despune.org
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;