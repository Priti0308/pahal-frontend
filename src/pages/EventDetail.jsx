import EventBanner from "../components/EventDetails/EventBanner";
import EventCoordinators from "../components/EventDetails/EventCoordinators";
import EventSchedule from "../components/EventDetails/EventSchedule";
import FAQs from "../components/EventDetails/FAQs";
import Guidelines from "../components/EventDetails/Guidelines";
import PrizesRewards from "../components/EventDetails/PrizesRewards";
import QuickInfo from "../components/EventDetails/QuickInfo";
import SponsorsSection from "../components/EventDetails/SponsorsSection";

function EventDetails() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner Section - Full Width */}
      <div className="mb-10">
        <EventBanner />
      </div>
      
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content - 2/3 Width on Medium Screens and Up */}
          <div className="md:col-span-2 space-y-10">
            {/* Event Overview Section */}
            <div className="prose max-w-none bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b pb-2">Event Overview</h2>
              <p className="text-gray-700 leading-relaxed">
                Code Odyssey is CIMDR's flagship software development
                competition that brings together the brightest minds from
                colleges across India. Participants will tackle real-world
                problems through innovative software solutions, competing for
                prestigious awards and recognition in the tech community.
              </p>
            </div>
            
            {/* Schedule Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <EventSchedule />
            </div>
            
            {/* Guidelines Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Guidelines />
            </div>
            
            {/* FAQs Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <FAQs />
            </div>

            {/* FAQs Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <PrizesRewards />
            </div>

             {/* FAQs Section */}
             <div className="bg-white p-6 rounded-lg shadow-sm">
              <SponsorsSection />
            </div>
          </div>
          
          {/* Sidebar - 1/3 Width on Medium Screens and Up */}
          <div className="md:col-span-1 space-y-6 h-fit sticky top-10 self-start">
            {/* Quick Info Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <QuickInfo />
            </div>
            
            {/* Event Coordinators Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <EventCoordinators />
            </div>
            
            {/* Registration Button */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <button className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center">
                <span>Register Your Team</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {/* Additional Resources - Optional */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-600 hover:underline flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Contest Rules PDF
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Last Year Winners
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;