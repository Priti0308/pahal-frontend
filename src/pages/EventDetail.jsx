import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventBanner from "../components/EventDetails/EventBanner";
import EventCoordinators from "../components/EventDetails/EventCoordinators";
import EventSchedule from "../components/EventDetails/EventSchedule";
import FAQs from "../components/EventDetails/FAQs";
import Guidelines from "../components/EventDetails/Guidelines";
import PrizesRewards from "../components/EventDetails/PrizesRewards";
import QuickInfo from "../components/EventDetails/QuickInfo";
import SponsorsSection from "../components/EventDetails/SponsorsSection";
import { File, ExternalLink } from "lucide-react";

// Map icon strings to Lucide components for resources section
const iconMap = {
  File: File,
  ExternalLink: ExternalLink
};

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/events/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const eventData = await response.json();
        setEvent(eventData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching event details:", err);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading event details...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8">Error loading event: {error}</div>;
  }

  if (!event) {
    return <div className="container mx-auto px-4 py-8">Event not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner Section - Full Width */}
      <div className="mb-10">
        <EventBanner event={event} />
      </div>
      
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content - 2/3 Width on Medium Screens and Up */}
          <div className="md:col-span-2 space-y-10">
            {/* Event Overview Section */}
            <div className="prose max-w-none bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b pb-2">Event Overview</h2>
              <p className="text-gray-700 leading-relaxed">
                {event.description}
              </p>
            </div>
            
            {/* Schedule Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <EventSchedule event={event} />
            </div>
            
            {/* Guidelines Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Guidelines event={event} />
            </div>
            
            {/* FAQs Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <FAQs event={event} />
            </div>

            {/* Prizes Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <PrizesRewards event={event} />
            </div>

            {/* Sponsors Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <SponsorsSection event={event} />
            </div>
          </div>
          
          {/* Sidebar - 1/3 Width on Medium Screens and Up */}
          <div className="md:col-span-1 space-y-6 h-fit sticky top-10 self-start">
            {/* Quick Info Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <QuickInfo event={event} />
            </div>
            
            {/* Event Coordinators Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <EventCoordinators event={event} />
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
            {event.resources && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Resources</h3>
                <ul className="space-y-2">
                  {event.resources.map((resource, index) => {
                    const IconComponent = iconMap[resource.icon];
                    
                    return (
                      <li key={index}>
                        <a href={resource.url} className="text-blue-600 hover:underline flex items-center">
                          {IconComponent && <IconComponent className="h-4 w-4 mr-2" />}
                          {resource.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;