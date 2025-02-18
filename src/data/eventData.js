// data/eventData.js
export const events = new Map([
    ['code-odyssey-2024', {
      id: 'code-odyssey-2024',
      title: 'Code Odyssey 2024',
      subtitle: 'Annual Software Development Competition',
      date: 'March 15-17, 2024',
      time: '9:00 AM - 6:00 PM',
      location: 'CIMDR Campus, Sangli',
      backgroundImage: '/api/placeholder/1920/500',
      description: 'Join us for an exciting software development competition',
      status: 'upcoming',
      category: 'competition'
    }],
    ['tech-summit-2024', {
      id: 'tech-summit-2024',
      title: 'Tech Summit 2024',
      subtitle: 'Innovation & Technology Conference',
      date: 'April 20-21, 2024',
      time: '10:00 AM - 5:00 PM',
      location: 'CIMDR Campus, Sangli',
      backgroundImage: '/api/placeholder/1920/500',
      description: 'Exploring the future of technology',
      status: 'upcoming',
      category: 'conference'
    }]
  ]);
  
  export const getEvent = (eventId) => {
    return events.get(eventId);
  };
  
  export const getAllEvents = () => {
    return Array.from(events.values());
  };
  
  export const getUpcomingEvents = () => {
    return Array.from(events.values()).filter(event => event.status === 'upcoming');
  };