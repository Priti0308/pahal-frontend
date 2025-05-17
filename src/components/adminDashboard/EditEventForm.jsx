import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  PlusCircle, XCircle, Save, ArrowLeft, CheckCircle, AlertCircle, 
  X, ChevronUp, ChevronDown, CheckCircle2, ShieldAlert, Info,
  AlertOctagon, Loader2, ArrowUp
} from 'lucide-react';
import { BASE_URL } from '../../context/constants';

const EditEventForm = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formStatus, setFormStatus] = useState({ status: 'idle', message: '' });
  const [notification, setNotification] = useState({ visible: false, type: '', message: '', icon: null });
  const [expandedSections, setExpandedSections] = useState(['basic']); // Default expand basic section
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [isTouched, setIsTouched] = useState({}); // Track touched fields for validation
  const [progress, setProgress] = useState(0); // Form completion progress
  const [autoSave, setAutoSave] = useState({ enabled: false, lastSaved: null, status: 'idle' });
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    isActive: '',
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
        const response = await fetch(`${BASE_URL}/events/${eventId}`);
        
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
    
    // Mark field as touched for immediate validation feedback
    setIsTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Calculate form completion progress
    calculateProgress();
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
    
    // Update progress when removing items
    calculateProgress();
  };
  
  // Calculate form completion percentage
  const calculateProgress = () => {
    const requiredFields = [
      'title', 'category', 'isActive', 'teamSize', 'date', 
      'time', 'location', 'description', 'bannerImage'
    ];
    
    const optionalFields = [
      'emoji', 'registrationFee', 'attendees'
    ];
    
    // Count filled required fields
    let filledRequired = 0;
    requiredFields.forEach(field => {
      if (formData[field] && formData[field].toString().trim() !== '') {
        filledRequired++;
      }
    });
    
    // Count filled optional fields
    let filledOptional = 0;
    optionalFields.forEach(field => {
      if (formData[field] && formData[field].toString().trim() !== '') {
        filledOptional++;
      }
    });
    
    // Calculate nested items completion
    const arrayCategories = ['prizes', 'schedule', 'guidelines', 'faqs', 'sponsors', 'coordinators', 'resources'];
    let nestedTotal = 0;
    let nestedFilled = 0;
    
    arrayCategories.forEach(category => {
      if (formData[category] && formData[category].length > 0) {
        if (category === 'guidelines') {
          formData[category].forEach(item => {
            nestedTotal++;
            if (item && item.trim() !== '') nestedFilled++;
          });
        } else {
          formData[category].forEach(item => {
            Object.keys(item).forEach(key => {
              nestedTotal++;
              if (item[key] && item[key].toString().trim() !== '') nestedFilled++;
            });
          });
        }
      }
    });
    
    // Quick info completion
    let quickInfoTotal = 4; //  teamSize, prizePool, duration, eligibility
    let quickInfoFilled = 0;
    
    Object.keys(formData.quickInfo).forEach(key => {
      if (formData.quickInfo[key] && formData.quickInfo[key].trim() !== '') {
        quickInfoFilled++;
      }
    });
    
    // Calculate total progress
    const requiredWeight = 0.6; // 60% weight to required fields
    const optionalWeight = 0.1; // 10% weight to optional fields
    const nestedWeight = 0.2;  // 20% weight to nested items
    const quickInfoWeight = 0.1; // 10% weight to quick info
    
    const requiredScore = requiredFields.length > 0 ? (filledRequired / requiredFields.length) * requiredWeight : 0;
    const optionalScore = optionalFields.length > 0 ? (filledOptional / optionalFields.length) * optionalWeight : 0;
    const nestedScore = nestedTotal > 0 ? (nestedFilled / nestedTotal) * nestedWeight : 0;
    const quickInfoScore = (quickInfoFilled / quickInfoTotal) * quickInfoWeight;
    
    const totalProgress = Math.min(Math.round((requiredScore + optionalScore + nestedScore + quickInfoScore) * 100), 100);
    setProgress(totalProgress);
  };
  
  const validateForm = () => {
    const newErrors = {};
    const sectionsWithErrors = [];
    
    // Basic validation - Basic Information section
    if (!formData.title?.trim()) {
      newErrors.title = "Event title is required";
      sectionsWithErrors.push('basic');
    } else if (formData.title.length < 5) {
      newErrors.title = "Event title should be at least 5 characters";
      sectionsWithErrors.push('basic');
    }
    
    // Category validation
    if (!formData.category?.trim()) {
      newErrors.category = "Please select an event category";
      sectionsWithErrors.push('basic');
    }
    
    if (formData.isActive === '') {
      newErrors.isActive = "Please select event status";
      sectionsWithErrors.push('basic');
    }
    
    // Date, Time, and Location section
    if (!formData.date?.trim()) {
      newErrors.date = "Event date is required";
      sectionsWithErrors.push('datetime');
    }
    
    if (!formData.time?.trim()) {
      newErrors.time = "Event time is required";
      sectionsWithErrors.push('datetime');
    }
    
    if (!formData.location?.trim()) {
      newErrors.location = "Event location is required";
      sectionsWithErrors.push('datetime');
    }
    
    // Description and Banner section
    if (!formData.description?.trim()) {
      newErrors.description = "Event description is required";
      sectionsWithErrors.push('details');
    } else if (formData.description.length < 50) {
      newErrors.description = "Please provide a more detailed description (at least 50 characters)";
      sectionsWithErrors.push('details');
    }
    
    if (!formData.bannerImage?.trim()) {
      newErrors.bannerImage = "Banner image URL is required";
      sectionsWithErrors.push('details');
    } else if (!/^https?:\/\/.+/.test(formData.bannerImage)) {
      newErrors.bannerImage = "Please enter a valid image URL (starting with http:// or https://)";
      sectionsWithErrors.push('details');
    }
    
    // Number validation
    if (!formData.teamSize || isNaN(formData.teamSize) || formData.teamSize <= 0) {
      newErrors.teamSize = "Team size must be a positive number";
      sectionsWithErrors.push('basic');
    }
    
    if (formData.attendees && (isNaN(formData.attendees) || formData.attendees <= 0)) {
      newErrors.attendees = "Expected attendees must be a positive number";
      sectionsWithErrors.push('details');
    }
    
    // Validate at least one guideline is provided
    if (!formData.guidelines?.length || !formData.guidelines[0].trim()) {
      newErrors.guidelines = "Please add at least one guideline";
      sectionsWithErrors.push('guidelines');
    }
    
    // Expand sections with errors
    if (sectionsWithErrors.length > 0) {
      setExpandedSections([...new Set([...expandedSections, ...sectionsWithErrors])]);
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Function to toggle section visibility
  const toggleSection = (section) => {
    if (expandedSections.includes(section)) {
      setExpandedSections(expandedSections.filter(s => s !== section));
    } else {
      setExpandedSections([...expandedSections, section]);
    }
  };
  
  // Function to check if a section has errors
  const sectionHasErrors = (section) => {
    switch(section) {
      case 'basic':
        return !!(errors.title || errors.emoji || errors.teamSize || errors.category || errors.isActive);
      case 'datetime':
        return !!(errors.date || errors.time || errors.location || errors.registrationFee);
      case 'details':
        return !!(errors.bannerImage || errors.description || errors.attendees);
      case 'quickInfo':
        return false; // Optional section
      case 'prizes':
        return false; // Optional section
      case 'schedule':
        return false; // Optional section
      case 'guidelines':
        return !!errors.guidelines;
      case 'faqs':
        return false; // Optional section
      case 'sponsors':
        return false; // Optional section
      case 'coordinators':
        return false; // Optional section
      case 'resources':
        return false; // Optional section
      default:
        return false;
    }
  };
  
  // Show notification function  
  const showNotification = (type, message, duration = 5000) => {
    // Set icon based on notification type
    let icon = null;
    if (type === 'success') icon = CheckCircle;
    else if (type === 'error') icon = AlertCircle;
    else if (type === 'warning') icon = AlertOctagon;
    else icon = Info;
    
    setNotification({ visible: true, type, message, icon });
    
    if (duration) {
      setTimeout(() => {
        setNotification({ visible: false, type: '', message: '', icon: null });
      }, duration);
    }
  };
  
  // Close notification function
  const closeNotification = () => {
    setNotification({ visible: false, type: '', message: '', icon: null });
  };
  
  // Function to check if a field should show validation error
  const shouldShowError = (fieldName) => {
    return (isTouched[fieldName] || formStatus.status === 'error') && errors[fieldName];
  };  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showNotification('error', 'Please fix the errors in the form before submitting');
      
      // Scroll to the first error section
      if (errors && Object.keys(errors).length > 0) {
        const firstErrorField = Object.keys(errors)[0];
        const errorSection = document.querySelector(`[data-field="${firstErrorField}"]`);
        if (errorSection) {
          errorSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    
    // Show confirmation dialog with more context
    if (!window.confirm('You are about to update this event. All changes will be saved and reflected immediately. Continue?')) {
      return;
    }
    
    try {
      setFormStatus({ status: 'submitting', message: 'Updating event...' });
      
      // Show loading cursor
      document.body.style.cursor = 'wait';
      
      const response = await fetch(`${BASE_URL}/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Add auth token if using authentication
        },
        body: JSON.stringify(formData),
      });
      
      // Reset cursor
      document.body.style.cursor = 'default';
      
      const data = await response.json();
      
      if (response.ok) {
        setFormStatus({ 
          status: 'success', 
          message: 'Event updated successfully!' 
        });
        
        showNotification('success', 'Event has been updated successfully! Redirecting to events page...');
        
        // Show success animation before redirect
        setTimeout(() => {
          navigate('/admin/manage-events');
        }, 2000);
      } else {
        // Parse the error response for more specific feedback
        const errorMessage = data.message || 
                            (typeof data.error === 'string' ? data.error : 'Failed to update event');
        
        setFormStatus({ 
          status: 'error', 
          message: errorMessage 
        });
        
        showNotification('error', `${errorMessage}. Please check your form and try again.`);
      }
    } catch (error) {
      console.error('Error updating event:', error);
      setFormStatus({ 
        status: 'error', 
        message: 'Server error. Please try again later.' 
      });
      
      showNotification('error', 'Connection error occurred. Please check your internet connection and try again.');
    }
  };
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 bg-white rounded-lg shadow-md p-8">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-t-indigo-500 border-gray-300 mb-4"></div>
        <p className="text-lg font-medium text-gray-700">Loading event data...</p>
        <p className="text-sm text-gray-500 mt-2">Please wait while we fetch the event information</p>
        <div className="w-48 h-2 bg-gray-200 rounded-full mt-4">
          <div className="h-2 bg-indigo-500 rounded-full animate-pulse" style={{ width: '75%' }}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg mx-auto mt-10">
        <div className="bg-red-500 p-4 flex items-center">
          <AlertOctagon className="h-8 w-8 text-white mr-3" />
          <h3 className="text-xl font-bold text-white">Error Loading Event</h3>
        </div>
        <div className="p-6">
          <p className="text-gray-700 mb-4">{error}</p>
          <p className="text-gray-600 text-sm mb-6">The event data could not be loaded. This might be due to a network issue or the event may no longer exist.</p>
          <div className="flex space-x-3">
            <button 
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center"
              onClick={() => navigate('/admin/manage-events')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Events
            </button>
            <button 
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg relative">
      {/* Enhanced Notification Component */}
      {notification.visible && (
        <div 
          className={`fixed top-4 right-4 z-50 max-w-md p-4 rounded-lg shadow-xl border-l-4 flex items-center justify-between transition-all duration-300 transform animate-slide-in-right ${
            notification.type === 'success' 
              ? 'bg-green-50 border-green-500 text-green-800' 
              : notification.type === 'error' 
              ? 'bg-red-50 border-red-500 text-red-800'
              : notification.type === 'warning'
              ? 'bg-yellow-50 border-yellow-500 text-yellow-800'
              : 'bg-blue-50 border-blue-500 text-blue-800'
          }`}
        >
          <div className="flex items-center">
            {notification.type === 'success' ? (
              <div className="mr-3 flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
            ) : notification.type === 'error' ? (
              <div className="mr-3 flex-shrink-0">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
              </div>
            ) : notification.type === 'warning' ? (
              <div className="mr-3 flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <AlertOctagon className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
            ) : (
              <div className="mr-3 flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Info className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            )}
            <div>
              <p className="font-medium text-sm">{notification.message}</p>
            </div>
          </div>
          <button 
            onClick={closeNotification}
            className="ml-4 flex-shrink-0 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full p-1"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      
      {/* Enhanced Form Status Bar */}
      {formStatus.status !== 'idle' && (
        <div 
          className={`sticky top-0 z-40 w-full p-3 mb-4 rounded-lg shadow-md border-l-4 ${
            formStatus.status === 'submitting' 
              ? 'bg-blue-50 text-blue-700 border-blue-500 animate-pulse' 
              : formStatus.status === 'success' 
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-500'
              : 'bg-red-50 text-red-700 border-red-500'
          } flex items-center justify-between`}
        >
          <div className="flex items-center">
            {formStatus.status === 'submitting' && (
              <div className="mr-3 flex-shrink-0">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {formStatus.status === 'success' && (
              <div className="mr-3 flex-shrink-0">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
              </div>
            )}
            {formStatus.status === 'error' && (
              <div className="mr-3 flex-shrink-0">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                  <ShieldAlert className="w-4 h-4 text-red-600" />
                </div>
              </div>
            )}
            <span className="font-medium">{formStatus.message}</span>
          </div>
          <button 
            type="button"
            onClick={() => setFormStatus({ status: 'idle', message: '' })}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full p-1"
            aria-label="Close status message"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      
      <div className="flex items-center mb-6">
        <button
          type="button"
          onClick={() => navigate('/admin/manage-events')}
          className="mr-4 flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back
        </button>
        <h1 className="text-3xl font-bold text-center text-indigo-700 flex-grow pr-10">Edit Event</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Form completion progress bar */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700">Form Completion</h3>
            <span className="text-sm font-medium text-indigo-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full transition-all duration-500 ease-out ${
                progress < 30 ? 'bg-red-500' : 
                progress < 70 ? 'bg-yellow-500' : 
                'bg-green-500'
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Fill in all required fields and add relevant details to complete the form
          </p>
        </div>
        
        {/* Form sections summary - quick navigation */}
        <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
          <h3 className="text-md font-medium mb-2 text-indigo-800">Form Sections</h3>
          <div className="flex flex-wrap gap-2">
            <button 
              type="button"
              onClick={() => document.getElementById('section-basic').scrollIntoView({ behavior: 'smooth' })}
              className={`px-3 py-1 rounded-full text-xs font-medium flex items-center 
                ${sectionHasErrors('basic') 
                  ? 'bg-red-100 text-red-800 border border-red-200' 
                  : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'}`}
            >
              {sectionHasErrors('basic') ? <AlertCircle className="w-3 h-3 mr-1" /> : null}
              Basic Information
            </button>
            <button 
              type="button"
              onClick={() => document.getElementById('section-datetime').scrollIntoView({ behavior: 'smooth' })}
              className={`px-3 py-1 rounded-full text-xs font-medium flex items-center
                ${sectionHasErrors('datetime') 
                  ? 'bg-red-100 text-red-800 border border-red-200' 
                  : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'}`}
            >
              {sectionHasErrors('datetime') ? <AlertCircle className="w-3 h-3 mr-1" /> : null}
              Date & Location
            </button>
            <button 
              type="button"
              onClick={() => document.getElementById('section-details').scrollIntoView({ behavior: 'smooth' })}
              className={`px-3 py-1 rounded-full text-xs font-medium flex items-center
                ${sectionHasErrors('details') 
                  ? 'bg-red-100 text-red-800 border border-red-200' 
                  : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'}`}
            >
              {sectionHasErrors('details') ? <AlertCircle className="w-3 h-3 mr-1" /> : null}
              Event Details
            </button>
            <button 
              type="button"
              onClick={() => document.getElementById('section-quickInfo').scrollIntoView({ behavior: 'smooth' })}
              className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
            >
              Quick Info
            </button>
            <button 
              type="button"
              onClick={() => document.getElementById('section-prizes').scrollIntoView({ behavior: 'smooth' })}
              className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
            >
              Prizes
            </button>
            <button 
              type="button"
              onClick={() => document.getElementById('section-guidelines').scrollIntoView({ behavior: 'smooth' })}
              className={`px-3 py-1 rounded-full text-xs font-medium flex items-center
                ${sectionHasErrors('guidelines') 
                  ? 'bg-red-100 text-red-800 border border-red-200' 
                  : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'}`}
            >
              {sectionHasErrors('guidelines') ? <AlertCircle className="w-3 h-3 mr-1" /> : null}
              Guidelines
            </button>
            <button 
              type="button"
              onClick={() => document.getElementById('section-schedule').scrollIntoView({ behavior: 'smooth' })}
              className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
            >
              Schedule
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div data-field="title">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Event Title *
    </label>
    <div className="relative">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className={`w-full p-2 border rounded-md transition-colors focus:ring-2 focus:ring-indigo-300 ${errors.title ? 'border-red-500 bg-red-50' : isTouched.title && !errors.title ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}
        placeholder="e.g., Code Odyssey 2025"
        onBlur={() => setIsTouched(prev => ({...prev, title: true}))}
      />
      {isTouched.title && !errors.title && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <CheckCircle className="h-4 w-4 text-green-500" />
        </div>
      )}
    </div>
    {errors.title && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1" /> {errors.title}</p>}
    <p className="text-xs text-gray-500 mt-1">Choose a catchy, descriptive title that clearly represents your event</p>
  </div>
  
  <div data-field="emoji">
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

  <div data-field="isActive">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Event Status *
    </label>
    <select
      name="isActive"
      value={formData.isActive}
      onChange={handleChange}
      className="w-full p-2 border border-gray-300 rounded-md"
    >
      <option value="">Select Status</option>
      <option value={true}>Active</option>
      <option value={false}>Inactive</option>
    </select>
    <p className="text-xs text-gray-500 mt-1">Set whether the event is currently active or inactive</p>
  </div>
  
  <div data-field="teamSize">
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
  
  <div data-field="category">
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
      <option value="Technical">Technical</option>
      <option value="Management">Management</option>
      <option value="Fun & Sports">Fun & Sports</option>
    </select>
    <p className="text-xs text-gray-500 mt-1">Choose the category that best describes your event</p>
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
                placeholder="e.g., March 15, 2024" 
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
            
            <div>              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prize Pool
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.quickInfo.prizePool}
                  onChange={(e) => handleQuickInfoChange('prizePool', e.target.value)}
                  className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition"
                  placeholder="e.g., ₹50,000"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <span className="text-gray-500">💰</span>
                </div>
                {formData.quickInfo.prizePool.trim() !== "" && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Total prize amount for all winners combined</p>
            </div>
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Duration
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.quickInfo.duration}
                  onChange={(e) => handleQuickInfoChange('duration', e.target.value)}
                  className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition"
                  placeholder="e.g., 3 days"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <span className="text-gray-500">⏱️</span>
                </div>
                {formData.quickInfo.duration.trim() !== "" && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                )}
              </div>
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
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-4 rounded-lg hover:from-green-600 hover:to-emerald-700 shadow-lg flex items-center text-lg font-medium transition-all transform hover:scale-105 hover:shadow-xl"
          >
            <Save className="w-5 h-5 mr-2" /> Update Event
          </button>
        </div>
        <p className="text-center text-gray-500 text-sm mt-4">
          All fields marked with * are required. You can come back and edit this event anytime.
        </p>
      </form>
    </div>
  );
};

export default EditEventForm;
 