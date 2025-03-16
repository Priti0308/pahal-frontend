import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PlusCircle, XCircle, Save, ArrowLeft } from 'lucide-react';

const EditEventForm = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    emoji: '',
    teamSize: '',
    category: '',
    date: '',
    time: '',
    location: '',
    bannerImage: '',
    description: '',
    registrationFee: '',
    attendees: '',
    prizes: [
      {
        title: '',
        amount: '',
        description: '',
        icon: '',
        color: ''
      }
    ],
    schedule: [
      {
        round: '',
        date: '',
        description: ''
      }
    ],
    guidelines: [''],
    faqs: [
      {
        question: '',
        answer: ''
      }
    ],
    sponsors: [
      {
        name: '',
        image: ''
      }
    ],
    coordinators: [
      {
        name: '',
        contact: '',
        image: ''
      }
    ],
    quickInfo: {
      teamSize: '',
      prizePool: '',
      duration: '',
      eligibility: ''
    },
    resources: [
      {
        name: '',
        icon: '',
        url: ''
      }
    ]
  });

  const [errors, setErrors] = useState({});

  // Fetch existing event data
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/events/${eventId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch event data');
        }
        
        const eventData = await response.json();
        
        // Ensure all expected properties exist
        const formattedData = {
          ...formData,
          ...eventData,
          // Ensure these arrays exist with at least one item
          prizes: eventData.prizes?.length ? eventData.prizes : [{ title: '', amount: '', description: '', icon: '', color: '' }],
          schedule: eventData.schedule?.length ? eventData.schedule : [{ round: '', date: '', description: '' }],
          guidelines: eventData.guidelines?.length ? eventData.guidelines : [''],
          faqs: eventData.faqs?.length ? eventData.faqs : [{ question: '', answer: '' }],
          sponsors: eventData.sponsors?.length ? eventData.sponsors : [{ name: '', image: '' }],
          coordinators: eventData.coordinators?.length ? eventData.coordinators : [{ name: '', contact: '', image: '' }],
          resources: eventData.resources?.length ? eventData.resources : [{ name: '', icon: '', url: '' }],
          // Ensure quickInfo exists
          quickInfo: eventData.quickInfo || {
            teamSize: '',
            prizePool: '',
            duration: '',
            eligibility: ''
          }
        };
        
        setFormData(formattedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching event data:', err);
        setError('Failed to load event data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEventData();
    }
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNestedChange = (category, index, field, value) => {
    const updatedArray = [...formData[category]];
    updatedArray[index] = {
      ...updatedArray[index],
      [field]: value
    };
    setFormData({
      ...formData,
      [category]: updatedArray
    });
  };

  const handleQuickInfoChange = (field, value) => {
    setFormData({
      ...formData,
      quickInfo: {
        ...formData.quickInfo,
        [field]: value
      }
    });
  };

  const handleGuidelineChange = (index, value) => {
    const updatedGuidelines = [...formData.guidelines];
    updatedGuidelines[index] = value;
    setFormData({
      ...formData,
      guidelines: updatedGuidelines
    });
  };

  const addItem = (category) => {
    let newItem;
    switch (category) {
      case 'prizes':
        newItem = { title: '', amount: '', description: '', icon: '', color: '' };
        break;
      case 'schedule':
        newItem = { round: '', date: '', description: '' };
        break;
      case 'guidelines':
        newItem = '';
        break;
      case 'faqs':
        newItem = { question: '', answer: '' };
        break;
      case 'sponsors':
        newItem = { name: '', image: '' };
        break;
      case 'coordinators':
        newItem = { name: '', contact: '', image: '' };
        break;
      case 'resources':
        newItem = { name: '', icon: '', url: '' };
        break;
      default:
        return;
    }
    setFormData({
      ...formData,
      [category]: [...formData[category], newItem]
    });
  };

  const removeItem = (category, index) => {
    const updatedArray = [...formData[category]];
    updatedArray.splice(index, 1);
    setFormData({
      ...formData,
      [category]: updatedArray
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Basic validation
    if (!formData.title.trim()) newErrors.title = "Event title is required";
    if (!formData.description.trim()) newErrors.description = "Event description is required";
    if (!formData.date.trim()) newErrors.date = "Event date is required";
    if (!formData.location.trim()) newErrors.location = "Event location is required";
    if (!formData.bannerImage.trim()) newErrors.bannerImage = "Banner image URL is required";
    
    // Number validation
    if (isNaN(formData.teamSize) || formData.teamSize <= 0) {
      newErrors.teamSize = "Team size must be a positive number";
    }
    
    if (isNaN(formData.attendees) || formData.attendees <= 0) {
      newErrors.attendees = "Expected attendees must be a positive number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      window.scrollTo(0, 0);
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Event updated successfully!');
        navigate('/admin/manage-events');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error updating form:', error);
      alert('Failed to update event. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-t-indigo-500 border-gray-300"></div>
        <p className="ml-2">Loading event data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md m-6" role="alert">
        <p>{error}</p>
        <button 
          className="mt-2 bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800"
          onClick={() => navigate('/admin/manage-events')}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/admin/manage-events')}
          className="mr-4 flex items-center text-gray-600 hover:text-indigo-600"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back
        </button>
        <h1 className="text-3xl font-bold text-center text-indigo-700 flex-grow pr-10">Edit Event</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g., Code Odyssey 2025"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              <p className="text-xs text-gray-500 mt-1">Choose a catchy, descriptive title that clearly represents your event</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Emoji
              </label>
              <input
                type="text"
                name="emoji"
                value={formData.emoji}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g., 🚀"
              />
              <p className="text-xs text-gray-500 mt-1">Add a single emoji that represents your event theme</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Team Size *
              </label>
              <input
                type="number"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.teamSize ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g., 4"
              />
              {errors.teamSize && <p className="text-red-500 text-sm mt-1">{errors.teamSize}</p>}
              <p className="text-xs text-gray-500 mt-1">Maximum number of participants allowed per team</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Category</option>
                <option value="Software Development">Software Development</option>
                <option value="Design">Design</option>
                <option value="Business">Business</option>
                <option value="Engineering">Engineering</option>
                <option value="Science">Science</option>
                <option value="Arts">Arts</option>
                <option value="Other">Other</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Choose the category that best describes your event</p>
            </div>
          </div>
        </div>
        
        {/* Date, Time, and Location Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Date, Time, and Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Date *
              </label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g., March 15-17, 2024"
              />
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
              <p className="text-xs text-gray-500 mt-1">Specify the date range for your event (MM/DD/YYYY format)</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Time *
              </label>
              <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g., 9:00 AM - 6:00 PM"
              />
              <p className="text-xs text-gray-500 mt-1">Specify the time range for your event</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g., CIMDR Campus, Sangli"
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              <p className="text-xs text-gray-500 mt-1">Specify the physical location or mention if it's virtual</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration Fee
              </label>
              <input
                type="text"
                name="registrationFee"
                value={formData.registrationFee}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g., $25"
              />
              <p className="text-xs text-gray-500 mt-1">Leave blank if the event is free</p>
            </div>
          </div>
        </div>
        
        {/* Description and Banner Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Event Details</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Banner Image URL *
              </label>
              <input
                type="text"
                name="bannerImage"
                value={formData.bannerImage}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.bannerImage ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g., https://images.unsplash.com/photo-1555066931-4365d14bab8c"
              />
              {errors.bannerImage && <p className="text-red-500 text-sm mt-1">{errors.bannerImage}</p>}
              <p className="text-xs text-gray-500 mt-1">Provide a URL to an image that represents your event (16:9 ratio recommended)</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className={`w-full p-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Describe your event in detail..."
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              <p className="text-xs text-gray-500 mt-1">Provide a compelling description explaining the event's purpose, highlights, and target audience</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expected Attendees
              </label>
              <input
                type="number"
                name="attendees"
                value={formData.attendees}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.attendees ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g., 250"
              />
              {errors.attendees && <p className="text-red-500 text-sm mt-1">{errors.attendees}</p>}
              <p className="text-xs text-gray-500 mt-1">Estimated number of participants expected to attend</p>
            </div>
          </div>
        </div>
        
        {/* Quick Info Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Team Size Range
              </label>
              <input
                type="text"
                value={formData.quickInfo.teamSize}
                onChange={(e) => handleQuickInfoChange('teamSize', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g., 2-4 members"
              />
              <p className="text-xs text-gray-500 mt-1">Specify the allowed team size range for the event</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prize Pool
              </label>
              <input
                type="text"
                value={formData.quickInfo.prizePool}
                onChange={(e) => handleQuickInfoChange('prizePool', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g., ₹50,000"
              />
              <p className="text-xs text-gray-500 mt-1">Total prize amount for all winners combined</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Duration
              </label>
              <input
                type="text"
                value={formData.quickInfo.duration}
                onChange={(e) => handleQuickInfoChange('duration', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g., 3 days"
              />
              <p className="text-xs text-gray-500 mt-1">Total duration of the event</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Eligibility
              </label>
              <input
                type="text"
                value={formData.quickInfo.eligibility}
                onChange={(e) => handleQuickInfoChange('eligibility', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g., All colleges"
              />
              <p className="text-xs text-gray-500 mt-1">Who can participate in this event</p>
            </div>
          </div>
        </div>
        
        {/* Prizes Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Prizes</h2>
            <button
              type="button"
              onClick={() => addItem('prizes')}
              className="flex items-center text-sm bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700"
            >
              <PlusCircle className="w-4 h-4 mr-1" /> Add Prize
            </button>
          </div>
          
          {formData.prizes.map((prize, index) => (
            <div key={index} className="bg-white p-4 rounded-md mb-4 shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-gray-800">Prize {index + 1}</h3>
                {formData.prizes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem('prizes', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={prize.title}
                    onChange={(e) => handleNestedChange('prizes', index, 'title', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g., First Prize"
                  />
                  <p className="text-xs text-gray-500 mt-1">Name for this prize category</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <input
                    type="text"
                    value={prize.amount}
                    onChange={(e) => handleNestedChange('prizes', index, 'amount', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g., ₹25,000"
                  />
                  <p className="text-xs text-gray-500 mt-1">Cash value or item worth</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={prize.description}
                    onChange={(e) => handleNestedChange('prizes', index, 'description', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g., Plus certification"
                  />
                  <p className="text-xs text-gray-500 mt-1">Any additional benefits included</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <input
                    type="text"
                    value={prize.icon}
                    onChange={(e) => handleNestedChange('prizes', index, 'icon', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g., Trophy"
                  />
                  <p className="text-xs text-gray-500 mt-1">Icon name to display (Trophy, Medal, etc.)</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                  <input
                    type="text"
                    value={prize.color}
                    onChange={(e) => handleNestedChange('prizes', index, 'color', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g., text-yellow-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Tailwind color class for this prize</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Schedule Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Event Schedule</h2>
            <button
              type="button"
              onClick={() => addItem('schedule')}
              className="flex items-center text-sm bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700"
            >
              <PlusCircle className="w-4 h-4 mr-1" /> Add Round
            </button>
          </div>
          
          {formData.schedule.map((round, index) => (
            <div key={index} className="bg-white p-4 rounded-md mb-4 shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-gray-800">Round {index + 1}</h3>
                {formData.schedule.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem('schedule', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Round Name</label>
                  <input
                    type="text"
                    value={round.round}
                    onChange={(e) => handleNestedChange('schedule', index, 'round', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g., Online Qualification"
                  />
                  <p className="text-xs text-gray-500 mt-1">Name of this event round or phase</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="text"
                    value={round.date}
                    onChange={(e) => handleNestedChange('schedule', index, 'date', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g., March 15, 2024"
                  />
                  <p className="text-xs text-gray-500 mt-1">Date when this round takes place</p>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={round.description}
                    onChange={(e) => handleNestedChange('schedule', index, 'description', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g., Online coding challenge"
                  />
                  <p className="text-xs text-gray-500 mt-1">Brief description of this round</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Guidelines Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Guidelines</h2>
            <button
              type="button"
              onClick={() => addItem('guidelines')}
              className="flex items-center text-sm bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700"
            >
              <PlusCircle className="w-4 h-4 mr-1" /> Add Guideline
            </button>
          </div>
          
          {formData.guidelines.map((guideline, index) => (
            <div key={index} className="flex items-center mb-3">
              <input
                type="text"
                value={guideline}
                onChange={(e) => handleGuidelineChange(index, e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-md"
                placeholder="e.g., Teams of 2-4 members"
              />
              {formData.guidelines.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem('guidelines', index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
          <p className="text-xs text-gray-500 mt-1">Add important rules and guidelines for participants</p>
        </div>
        
      {/* FAQs Section */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">FAQs</h2>
            <button
              type="button"
              onClick={() => addItem('faqs')}
              className="flex items-center text-sm bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700"
            >
              <PlusCircle className="w-4 h-4 mr-1" /> Add FAQ
            </button>
          </div>
          
          {formData.faqs.map((faq, index) => (
            <div key={index} className="bg-white p-4 rounded-md mb-4 shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium text-gray-800">FAQ {index + 1}</h3>
                {formData.faqs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem('faqs', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => handleNestedChange('faqs', index, 'question', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g., What is the registration fee?"
                  />
                  <p className="text-xs text-gray-500 mt-1">Commonly asked question about the event</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                  <textarea
                    value={faq.answer}
                    onChange={(e) => handleNestedChange('faqs', index, 'answer', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g., The event is free for all participants"
                    rows="2"
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">Clear answer to the question</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Sponsors Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Sponsors</h2>
            <button
              type="button"
              onClick={() => addItem('sponsors')}
              className="flex items-center text-sm bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700"
            >
              <PlusCircle className="w-4 h-4 mr-1" /> Add Sponsor
            </button>
          </div>
          
          {formData.sponsors.map((sponsor, index) => (
            <div key={index} className="bg-white p-4 rounded-md mb-4 shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-gray-800">Sponsor {index + 1}</h3>
                {formData.sponsors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem('sponsors', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={sponsor.name}
                    onChange={(e) => handleNestedChange('sponsors', index, 'name', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g., TechCorp"
                  />
                  <p className="text-xs text-gray-500 mt-1">Name of the sponsoring organization</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Logo Image</label>
                  <input
                    type="text"
                    value={sponsor.image}
                    onChange={(e) => handleNestedChange('sponsors', index, 'image', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g., https://example.com/logo.png"
                  />
                  <p className="text-xs text-gray-500 mt-1">Sponsor logo URL</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Coordinators Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Coordinators</h2>
            <button
              type="button"
              onClick={() => addItem('coordinators')}
              className="flex items-center text-sm bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700"
            >
              <PlusCircle className="w-4 h-4 mr-1" /> Add Coordinator
            </button>
          </div>
          
          {formData.coordinators.map((coordinator, index) => (
            <div key={index} className="bg-white p-4 rounded-md mb-4 shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-gray-800">Coordinator {index + 1}</h3>
                {formData.coordinators.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem('coordinators', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={coordinator.name}
                    onChange={(e) => handleNestedChange('coordinators', index, 'name', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g., Prof. Rajesh Kumar"
                  />
                  <p className="text-xs text-gray-500 mt-1">Full name with title if applicable</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                  <input
                    type="text"
                    value={coordinator.contact}
                    onChange={(e) => handleNestedChange('coordinators', index, 'contact', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g., +91 98765 43210"
                  />
                  <p className="text-xs text-gray-500 mt-1">Phone number or email address</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                  <input
                    type="text"
                    value={coordinator.image}
                    onChange={(e) => handleNestedChange('coordinators', index, 'image', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g., https://example.com/profile.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">Profile image URL</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Resources Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Resources</h2>
            <button
              type="button"
              onClick={() => addItem('resources')}
              className="flex items-center text-sm bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700"
            >
              <PlusCircle className="w-4 h-4 mr-1" /> Add Resource
            </button>
          </div>
          
          {formData.resources.map((resource, index) => (
            <div key={index} className="bg-white p-4 rounded-md mb-4 shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-gray-800">Resource {index + 1}</h3>
                {formData.resources.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem('resources', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={resource.name}
                    onChange={(e) => handleNestedChange('resources', index, 'name', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g., Event Rules"
                  />
                  <p className="text-xs text-gray-500 mt-1">Name of the resource</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <input
                    type="text"
                    value={resource.icon}
                    onChange={(e) => handleNestedChange('resources', index, 'icon', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g., FileText"
                  />
                  <p className="text-xs text-gray-500 mt-1">Icon name for this resource</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                  <input
                    type="text"
                    value={resource.url}
                    onChange={(e) => handleNestedChange('resources', index, 'url', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g., https://example.com/rules.pdf"
                  />
                  <p className="text-xs text-gray-500 mt-1">Link to access this resource</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 flex items-center text-lg font-medium"
          >
            <Save className="w-5 h-5 mr-2" /> Update Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEventForm;