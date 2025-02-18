// eventData.js
import cimdr from "../assets/cimdr.jpg";
import logo from "../assets/logo.png";
import techConf from "../assets/logo.png";
import artExhibit from "../assets/logo.png";
import sportsComp from "../assets/logo.png";
import musicFest from "../assets/logo.png";
import robotics from "../assets/logo.png";

export const eventsData = [
  {
    id: 1,
    title: "Code Odyssey",
    emoji: "🚀",
    category: "Software Development",
    date: "March 15-17, 2024",
    time: "9:00 AM - 6:00 PM",
    location: "CIMDR Campus, Sangli",
    bannerImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    description: "CIMDR's flagship software development competition that brings together the brightest minds from colleges across India. Participants will tackle real-world problems through innovative software solutions, competing for prestigious awards and recognition in the tech community.",
    registrationFee: "$25",
    attendees: 250,
    prizes: [
      {
        title: "First Prize",
        amount: "₹25,000",
        description: "Plus certification",
        icon: "Trophy",
        color: "text-yellow-500"
      },
      {
        title: "Second Prize",
        amount: "₹15,000",
        description: "Plus certification",
        icon: "Medal",
        color: "text-gray-500"
      },
      {
        title: "Third Prize",
        amount: "₹10,000",
        description: "Plus certification",
        icon: "Award",
        color: "text-orange-500"
      }
    ],
    schedule: [
      {
        round: "Round 1: Online Qualification",
        date: "March 15, 2024",
        description: "Online coding challenge to test algorithmic skills"
      },
      {
        round: "Round 2: Project Development",
        date: "March 16, 2024",
        description: "24-hour hackathon to build innovative solutions"
      },
      {
        round: "Round 3: Final Presentation",
        date: "March 17, 2024",
        description: "Project demonstration and judging"
      }
    ],
    guidelines: [
      "Teams must consist of 2-4 members from the same college",
      "All team members must be currently enrolled students",
      "Projects must be original and developed during the competition",
      "Use of open-source libraries and frameworks is allowed",
      "Teams must present their solutions in English"
    ],
    faqs: [
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
    ],
    sponsors: [
      {
        name: "Platinum Sponsor",
        image: logo
      },
      {
        name: "Gold Sponsor",
        image: logo,
      },
      {
        name: "Gold Sponsor",
        image: logo,
      },
      {
        name: "Silver Sponsor",
        image: logo,
      },
      {
        name: "Silver Sponsor",
        image: logo,
      },
      {
        name: "Silver Sponsor",
        image: logo,
      }
    ],
    coordinators: [
      {
        name: "Prof. Rajesh Kumar",
        contact: "+91 98765 43210",
        image: logo
      },
      {
        name: "Prof. Priya Sharma",
        contact: "+91 98765 43211",
        image: logo
      }
    ],
    quickInfo: {
      teamSize: "2-4 members",
      prizePool: "₹50,000",
      duration: "3 days",
      eligibility: "Open to all colleges"
    },
    resources: [
      {
        name: "Contest Rules PDF",
        icon: "File",
        url: "#"
      },
      {
        name: "Last Year Winners",
        icon: "ExternalLink",
        url: "#"
      }
    ]
  },
  {
    id: 2,
    title: "AI Summit 2024",
    emoji: "🤖",
    category: "Artificial Intelligence",
    date: "April 10-12, 2024",
    time: "10:00 AM - 5:00 PM",
    location: "CIMDR Conference Hall, Sangli",
    bannerImage: "https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "A cutting-edge conference bringing together AI researchers, practitioners, and enthusiasts to discuss the latest advancements in artificial intelligence, machine learning, and natural language processing. Featuring keynote speeches, paper presentations, and interactive workshops.",
    registrationFee: "$50",
    attendees: 300,
    prizes: [
      {
        title: "Best Paper Award",
        amount: "₹30,000",
        description: "Plus publication opportunity",
        icon: "FileText",
        color: "text-blue-500"
      },
      {
        title: "Best Presentation",
        amount: "₹20,000",
        description: "Plus speaking opportunity at next summit",
        icon: "Presentation",
        color: "text-green-500"
      },
      {
        title: "Innovation Award",
        amount: "₹15,000",
        description: "Plus mentorship from industry leaders",
        icon: "Lightbulb",
        color: "text-purple-500"
      }
    ],
    schedule: [
      {
        round: "Day 1: Keynote Speeches",
        date: "April 10, 2024",
        description: "Prominent AI researchers sharing insights on future trends"
      },
      {
        round: "Day 2: Paper Presentations",
        date: "April 11, 2024",
        description: "Research presentations and panel discussions"
      },
      {
        round: "Day 3: Workshops",
        date: "April 12, 2024",
        description: "Hands-on workshops on cutting-edge AI technologies"
      }
    ],
    guidelines: [
      "Attendees must register in advance",
      "Paper submissions must follow IEEE format guidelines",
      "Workshops have limited seats, available on first-come-first-serve basis",
      "All presentations will be recorded and published with presenter's consent",
      "Business casual attire is recommended"
    ],
    faqs: [
      {
        question: "Can students attend at a discounted rate?",
        answer: "Yes, students can avail a 50% discount on registration with valid ID."
      },
      {
        question: "Will there be networking opportunities?",
        answer: "Yes, there will be designated networking sessions each day and an evening reception on the second day."
      },
      {
        question: "Can I submit my paper after the deadline?",
        answer: "Late submissions will be considered on a case-by-case basis with a late fee."
      }
    ],
    sponsors: [
      {
        name: "Platinum Sponsor",
        image: logo
      },
      {
        name: "Gold Sponsor",
        image: logo,
      },
      {
        name: "Gold Sponsor",
        image: logo,
      }
    ],
    coordinators: [
      {
        name: "Dr. Anand Verma",
        contact: "+91 98765 43212",
        image: logo
      },
      {
        name: "Dr. Sunita Patel",
        contact: "+91 98765 43213",
        image: logo
      }
    ],
    quickInfo: {
      attendeeCapacity: "300 persons",
      speakerCount: "20+ industry experts",
      duration: "3 days",
      eligibility: "Open to researchers, professionals, and students"
    },
    resources: [
      {
        name: "Conference Agenda PDF",
        icon: "Calendar",
        url: "#"
      },
      {
        name: "Paper Submission Guidelines",
        icon: "FileText",
        url: "#"
      }
    ]
  },
  {
    id: 3,
    title: "Creative Arts Exhibition",
    emoji: "🎨",
    category: "Fine Arts",
    date: "May 5-10, 2024",
    time: "11:00 AM - 8:00 PM",
    location: "CIMDR Art Gallery, Sangli",
    bannerImage: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=2070&auto=format&fit=crop",
    description: "A week-long celebration of visual arts showcasing the talent of emerging and established artists from across the region. The exhibition includes paintings, sculptures, photography, digital art, and mixed media installations, providing a platform for creative expression and cultural exchange.",
    registrationFee: "$15",
    attendees: 500,
    prizes: [
      {
        title: "Best in Show",
        amount: "₹20,000",
        description: "Plus solo exhibition opportunity",
        icon: "Star",
        color: "text-yellow-500"
      },
      {
        title: "People's Choice Award",
        amount: "₹10,000",
        description: "Based on visitor voting",
        icon: "Heart",
        color: "text-red-500"
      },
      {
        title: "Young Artist Award",
        amount: "₹8,000",
        description: "For artists under 25",
        icon: "Palette",
        color: "text-pink-500"
      }
    ],
    schedule: [
      {
        round: "Opening Reception",
        date: "May 5, 2024",
        description: "Official inauguration with special guests"
      },
      {
        round: "Daily Exhibition",
        date: "May 6-9, 2024",
        description: "Open to public with guided tours at 2PM"
      },
      {
        round: "Closing Ceremony & Awards",
        date: "May 10, 2024",
        description: "Announcement of winners and closing reception"
      }
    ],
    guidelines: [
      "Artists must submit work proposals by April 15, 2024",
      "All mediums and styles are welcome",
      "Each artist may submit up to 3 pieces for consideration",
      "Artwork must be ready for display (framed, mounted, etc.)",
      "Artists are responsible for delivery and pickup of their work"
    ],
    faqs: [
      {
        question: "Is there an age restriction for artists?",
        answer: "No, artists of all ages are welcome to submit their work."
      },
      {
        question: "Can I sell my artwork during the exhibition?",
        answer: "Yes, artwork can be listed for sale with a 15% commission to the gallery."
      },
      {
        question: "Is there an entry fee for visitors?",
        answer: "There's a nominal fee of ₹100 for adults, free for students and children under 12."
      }
    ],
    sponsors: [
      {
        name: "Main Sponsor",
        image: logo
      },
      {
        name: "Supporting Sponsor",
        image: logo,
      },
      {
        name: "Community Partner",
        image: logo,
      }
    ],
    coordinators: [
      {
        name: "Ms. Aruna Desai",
        contact: "+91 98765 43214",
        image: logo
      },
      {
        name: "Mr. Vikram Singh",
        contact: "+91 98765 43215",
        image: logo
      }
    ],
    quickInfo: {
      artworkCount: "100+ pieces",
      artistCount: "40+ artists",
      duration: "6 days",
      eligibility: "Open to all artists"
    },
    resources: [
      {
        name: "Submission Guidelines",
        icon: "ClipboardList",
        url: "#"
      },
      {
        name: "Exhibition Layout",
        icon: "Map",
        url: "#"
      }
    ]
  },
  {
    id: 4,
    title: "Sports Championship",
    emoji: "🏆",
    category: "Athletics",
    date: "June 12-20, 2024",
    time: "8:00 AM - 6:00 PM",
    location: "CIMDR Sports Complex, Sangli",
    bannerImage: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?q=80&w=2068&auto=format&fit=crop",
    description: "A comprehensive multi-sport championship featuring competitions in cricket, football, basketball, athletics, badminton, and more. This week-long event promotes physical fitness, team spirit, and healthy competition among students from various educational institutions.",
    registrationFee: "$20 per team",
    attendees: 1000,
    prizes: [
      {
        title: "Overall Championship Trophy",
        amount: "₹50,000",
        description: "For institution with most points across all sports",
        icon: "Award",
        color: "text-gold-500"
      },
      {
        title: "Individual Sport Trophies",
        amount: "₹10,000",
        description: "For winners in each sport category",
        icon: "Trophy",
        color: "text-silver-500"
      },
      {
        title: "Best Athlete Award",
        amount: "₹15,000",
        description: "For outstanding individual performance",
        icon: "User",
        color: "text-bronze-500"
      }
    ],
    schedule: [
      {
        round: "Opening Ceremony",
        date: "June 12, 2024",
        description: "Inaugural parade and oath-taking ceremony"
      },
      {
        round: "Preliminary Rounds",
        date: "June 13-18, 2024",
        description: "Competitions across different sports categories"
      },
      {
        round: "Finals & Closing Ceremony",
        date: "June 19-20, 2024",
        description: "Championship finals and award distribution"
      }
    ],
    guidelines: [
      "Each institution can field one team per sport",
      "All participants must be enrolled students with valid ID",
      "Teams must wear proper sports attire during competitions",
      "International rules will be followed for each sport",
      "Unsportsmanlike conduct will result in disqualification"
    ],
    faqs: [
      {
        question: "Can an individual participate in multiple sports?",
        answer: "Yes, students can participate in up to three different sports competitions."
      },
      {
        question: "Is there medical support available?",
        answer: "Yes, medical teams will be present at all venues with first aid facilities."
      },
      {
        question: "What happens in case of rain?",
        answer: "Indoor sports will proceed as scheduled. Outdoor events will be rescheduled if necessary."
      }
    ],
    sponsors: [
      {
        name: "Title Sponsor",
        image: logo
      },
      {
        name: "Sports Partner",
        image: logo,
      },
      {
        name: "Nutrition Partner",
        image: logo,
      }
    ],
    coordinators: [
      {
        name: "Prof. Sunil Deshpande",
        contact: "+91 98765 43216",
        image: logo
      },
      {
        name: "Ms. Kavita Reddy",
        contact: "+91 98765 43217",
        image: logo
      }
    ],
    quickInfo: {
      sportCategories: "7+",
      participatingInstitutions: "20+",
      duration: "9 days",
      eligibility: "Open to all educational institutions"
    },
    resources: [
      {
        name: "Rules & Regulations",
        icon: "Book",
        url: "#"
      },
      {
        name: "Venue Map",
        icon: "MapPin",
        url: "#"
      }
    ]
  },
  {
    id: 5,
    title: "Cultural Festival",
    emoji: "🎭",
    category: "Performing Arts",
    date: "July 5-7, 2024",
    time: "4:00 PM - 10:00 PM",
    location: "CIMDR Amphitheater, Sangli",
    bannerImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2074&auto=format&fit=crop",
    description: "A vibrant celebration of cultural diversity featuring music, dance, drama, and other performing arts. The festival brings together talented performers from various backgrounds to showcase traditional and contemporary art forms, creating an immersive experience for all attendees.",
    registrationFee: "$10",
    attendees: 800,
    prizes: [
      {
        title: "Best Performance Award",
        amount: "₹25,000",
        description: "For outstanding cultural presentation",
        icon: "Music",
        color: "text-purple-500"
      },
      {
        title: "Cultural Excellence Award",
        amount: "₹15,000",
        description: "For authentic representation of traditional arts",
        icon: "MasksTheater",
        color: "text-indigo-500"
      },
      {
        title: "Audience Favorite",
        amount: "₹10,000",
        description: "Based on audience votes",
        icon: "ThumbsUp",
        color: "text-blue-500"
      }
    ],
    schedule: [
      {
        round: "Day 1: Music Performances",
        date: "July 5, 2024",
        description: "Classical, folk, and contemporary music concerts"
      },
      {
        round: "Day 2: Dance Showcase",
        date: "July 6, 2024",
        description: "Traditional, classical, and modern dance performances"
      },
      {
        round: "Day 3: Drama & Closing Ceremony",
        date: "July 7, 2024",
        description: "Theatrical performances and awards presentation"
      }
    ],
    guidelines: [
      "Performances must be between 15-30 minutes long",
      "Pre-registration is required for all performers",
      "Content must be appropriate for all age groups",
      "Technical requirements must be submitted 5 days before the event",
      "Performers should arrive 2 hours before their scheduled time"
    ],
    faqs: [
      {
        question: "Can I perform multiple acts?",
        answer: "Yes, individuals or groups can submit up to two different performances."
      },
      {
        question: "Is there parking available?",
        answer: "Yes, free parking is available at the venue with shuttle service from overflow lots."
      },
      {
        question: "Are food and beverages available?",
        answer: "Yes, food stalls offering various cuisines will be set up throughout the festival grounds."
      }
    ],
    sponsors: [
      {
        name: "Festival Patron",
        image: logo
      },
      {
        name: "Cultural Partner",
        image: logo,
      },
      {
        name: "Media Partner",
        image: logo,
      }
    ],
    coordinators: [
      {
        name: "Prof. Meena Iyer",
        contact: "+91 98765 43218",
        image: logo
      },
      {
        name: "Mr. Anil Sharma",
        contact: "+91 98765 43219",
        image: logo
      }
    ],
    quickInfo: {
      performanceCount: "30+",
      stages: "3 performing areas",
      duration: "3 days",
      eligibility: "Open to all cultural groups and individuals"
    },
    resources: [
      {
        name: "Performance Guidelines",
        icon: "FileText",
        url: "#"
      },
      {
        name: "Festival Program",
        icon: "Calendar",
        url: "#"
      }
    ]
  },
  {
    id: 6,
    title: "Robotics Challenge",
    emoji: "🤖",
    category: "Engineering",
    date: "August 18-20, 2024",
    time: "9:00 AM - 7:00 PM",
    location: "CIMDR Engineering Block, Sangli",
    bannerImage:  "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=2070&auto=format&fit=crop",
    description: "An intensive robotics competition challenging teams to design, build, and program robots to complete specific tasks. From autonomous navigation to precise manipulation, participants will push the boundaries of their technical skills while showcasing innovation and problem-solving abilities.",
    registrationFee: "$35 per team",
    attendees: 200,
    prizes: [
      {
        title: "Champion Team",
        amount: "₹35,000",
        description: "Plus robotics kit worth ₹15,000",
        icon: "Robot",
        color: "text-blue-600"
      },
      {
        title: "Innovation Award",
        amount: "₹20,000",
        description: "For most creative solution",
        icon: "Lightbulb",
        color: "text-yellow-600"
      },
      {
        title: "Technical Excellence",
        amount: "₹15,000",
        description: "For best engineering implementation",
        icon: "Cog",
        color: "text-gray-700"
      }
    ],
    schedule: [
      {
        round: "Day 1: Design Challenge",
        date: "August 18, 2024",
        description: "Robot design, building, and initial testing"
      },
      {
        round: "Day 2: Preliminary Rounds",
        date: "August 19, 2024",
        description: "Qualification runs and elimination rounds"
      },
      {
        round: "Day 3: Finals",
        date: "August 20, 2024",
        description: "Championship matches and awards ceremony"
      }
    ],
    guidelines: [
      "Teams must consist of 3-5 members",
      "Robots must fit within a 40cm x 40cm x 40cm cube",
      "Pre-built commercial robots are not allowed",
      "Standard microcontrollers (Arduino, Raspberry Pi, etc.) are permitted",
      "Robots must be autonomous with minimal remote control"
    ],
    faqs: [
      {
        question: "Are there weight restrictions for the robots?",
        answer: "Yes, robots must not exceed 5kg in weight."
      },
      {
        question: "Will components be provided?",
        answer: "Basic components will be available, but teams are encouraged to bring their own specialized parts."
      },
      {
        question: "Can we modify our robot between rounds?",
        answer: "Yes, minor modifications are allowed between rounds, but major redesigns are not permitted."
      }
    ],
    sponsors: [
      {
        name: "Technology Sponsor",
        image: logo
      },
      {
        name: "Engineering Partner",
        image: logo,
      },
      {
        name: "Component Supplier",
        image: logo,
      }
    ],
    coordinators: [
      {
        name: "Prof. Rahul Mehta",
        contact: "+91 98765 43220",
        image: logo
      },
      {
        name: "Dr. Nisha Tiwari",
        contact: "+91 98765 43221",
        image: logo
      }
    ],
    quickInfo: {
      teamCount: "40+ teams",
      challengeLevels: "3 difficulty tiers",
      duration: "3 days",
      eligibility: "Open to engineering students and hobbyists"
    },
    resources: [
      {
        name: "Challenge Rules",
        icon: "FileText",
        url: "#"
      },
      {
        name: "Technical Specifications",
        icon: "Settings",
        url: "#"
      }
    ]
  }
];

export const listEvents = [
  {
    id: 1,
    title: "Code Odyssey",
    category: "Software Development",
    date: "March 15-17, 2024",
    description: "CIMDR's flagship software development competition that brings together the brightest minds from colleges across India.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    location: "Main Campus, Technology Building",
    attendees: 250,
    registrationFee: "$25",
    prizes: ["$3000 First Prize", "$1500 Second Prize", "$750 Third Prize"],
    sponsors: ["TechCorp", "DevInnovate", "CodeMasters"]
  },
   
  {
    id: 2,
    title: "AI Summit 2024",
    category: "Artificial Intelligence",
    date: "April 10-12, 2024",
    description: "A cutting-edge conference bringing together AI researchers, practitioners, and enthusiasts to discuss the latest advancements.",
    image: "https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "CIMDR Conference Hall",
    attendees: 300,
    registrationFee: "$50",
    prizes: ["Best Paper Award", "Best Presentation", "Innovation Award"],
    sponsors: ["AI Solutions", "Machine Learning Corp", "Data Analytics Inc"]
  },
  {
    id: 3,
    title: "Creative Arts Exhibition",
    category: "Fine Arts",
    date: "May 5-10, 2024",
    description: "A week-long celebration of visual arts showcasing the talent of emerging and established artists from across the region.",
    image: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=2070&auto=format&fit=crop",
    location: "CIMDR Art Gallery",
    attendees: 500,
    registrationFee: "$15",
    prizes: ["Best in Show", "People's Choice Award", "Young Artist Award"],
    sponsors: ["ArtSpace", "Creative Canvas", "Cultural Foundation"]
  },
  {
    id: 4,
    title: "Sports Championship",
    category: "Athletics",
    date: "June 12-20, 2024",
    description: "A comprehensive multi-sport championship featuring competitions in cricket, football, basketball, athletics, and more.",
    image: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?q=80&w=2068&auto=format&fit=crop",
    location: "CIMDR Sports Complex",
    attendees: 1000,
    registrationFee: "$20 per team",
    prizes: ["Overall Championship Trophy", "Individual Sport Trophies", "Best Athlete Award"],
    sponsors: ["SportsPro", "Athletic Wear", "Health Supplements"]
  },
  {
    id: 5,
    title: "Cultural Festival",
    category: "Performing Arts",
    date: "July 5-7, 2024",
    description: "A vibrant celebration of cultural diversity featuring music, dance, drama, and other performing arts.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2074&auto=format&fit=crop",
    location: "CIMDR Amphitheater",
    attendees: 800,
    registrationFee: "$10",
    prizes: ["Best Performance Award", "Cultural Excellence Award", "Audience Favorite"],
    sponsors: ["Cultural Exchange Society", "Music Academy", "Arts Council"]
  },
  {
    id: 6,
    title: "Robotics Challenge",
    category: "Engineering",
    date: "August 18-20, 2024",
    description: "An intensive robotics competition challenging teams to design, build, and program robots to complete specific tasks.",
    image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=2070&auto=format&fit=crop",
    location: "CIMDR Engineering Block",
    attendees: 200,
    registrationFee: "$35 per team",
    prizes: ["Champion Team", "Innovation Award", "Technical Excellence"],
    sponsors: ["RoboTech", "Engineering Solutions", "Tech Components"]
  }
];

export function getEventById(id) {
  return eventsData.find(event => event.id === id);
}