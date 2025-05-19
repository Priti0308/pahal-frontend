import React from 'react';

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
      
      <div className="space-y-8 bg-white p-8 rounded-lg shadow-md">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Welcome to Pahal - CIMDR</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            These terms and conditions outline the rules and regulations for the use of Pahal - CIMDR's 
            platform and services. By accessing this platform and participating in our events, you accept 
            these terms and conditions in full.
          </p>
          <div className="text-gray-700 pl-4">
            <ul className="list-disc space-y-2">
              <li>Access to all platform features and events</li>
              <li>Participation in academic and professional activities</li>
              <li>Use of educational resources and materials</li>
              <li>Engagement with the CIMDR community</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Event Registration and Participation</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            When registering for events through our platform, all participants are required to provide 
            accurate and complete information.
          </p>
          <div className="text-gray-700 pl-4">
            <ul className="list-disc space-y-2">
              <li>Registration subject to availability and approval</li>
              <li>Adherence to event-specific guidelines required</li>
              <li>Non-refundable registration fees unless stated otherwise</li>
              <li>Mandatory attendance requirements for certified events</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Participant Conduct</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            As a participant in our events and user of our platform, you are expected to maintain 
            professional behavior at all times.
          </p>
          <div className="text-gray-700 pl-4">
            <ul className="list-disc space-y-2">
              <li>Maintain professional and respectful communication</li>
              <li>Follow academic integrity guidelines</li>
              <li>Respect intellectual property rights</li>
              <li>Comply with CIMDR's institutional policies</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Content and Intellectual Property</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            All content provided through our platform remains the property of CIMDR and is protected by 
            intellectual property laws.
          </p>
          <div className="text-gray-700 pl-4">
            <ul className="list-disc space-y-2">
              <li>Logos, images, and branding materials</li>
              <li>Educational content and resources</li>
              <li>Event materials and documentation</li>
              <li>Digital assets and presentations</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Liability and Disclaimers</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            While we strive to provide accurate and reliable services, CIMDR maintains certain 
            limitations on liability.
          </p>
          <div className="text-gray-700 pl-4">
            <ul className="list-disc space-y-2">
              <li>No liability for indirect or consequential damages</li>
              <li>Right to modify or suspend services</li>
              <li>No guarantee of continuous platform availability</li>
              <li>Force majeure conditions apply</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Updates to Terms</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may update these terms of service from time to time to reflect changes in our practices.
          </p>
          <div className="text-gray-700 pl-4">
            <ul className="list-disc space-y-2">
              <li>Regular review of terms recommended</li>
              <li>Notice of significant changes provided</li>
              <li>Continued use implies acceptance of updates</li>
              <li>Previous versions may be archived</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Terms;