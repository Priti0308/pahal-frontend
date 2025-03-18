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
import {
  File,
  ExternalLink,
  X,
  UserPlus,
  UserMinus,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BASE_URL } from "../context/constants";

// Map icon strings to Lucide components for resources section
const iconMap = {
  File: File,
  ExternalLink: ExternalLink,
};

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    eventId: "",
    teamName: "",
    teamLeader: {
      name: "",
      email: "",
      phone: "",
    },
    teamMembers: [],
  });
  const [formStatus, setFormStatus] = useState({ status: "idle", message: "" });
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/events/${id}`); 

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const eventData = await response.json();
        setEvent(eventData);
        setRegistrationData((prev) => ({
          ...prev,
          eventId: eventData._id || eventData.id,
        }));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching event details:", err);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleRegistrationClick = () => {
    setShowRegistrationForm(true);
    // Reset form when opening
    setRegistrationData({
      eventId: event._id || event.id,
      teamName: "",
      teamLeader: {
        name: "",
        email: "",
        phone: "",
      },
      teamMembers: [],
    });
    setActiveStep(0);
  };

  const handleFormChange = (field, value) => {
    setRegistrationData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTeamLeaderChange = (field, value) => {
    setRegistrationData((prev) => ({
      ...prev,
      teamLeader: {
        ...prev.teamLeader,
        [field]: value,
      },
    }));
  };

  const handleTeamMemberChange = (index, field, value) => {
    const updatedMembers = [...registrationData.teamMembers];
    updatedMembers[index] = {
      ...updatedMembers[index],
      [field]: value,
    };
    setRegistrationData((prev) => ({
      ...prev,
      teamMembers: updatedMembers,
    }));
  };

  const addTeamMember = () => {
    const minimumTeamSize = event.teamSize?.min || 1;
    const maximumTeamSize = event.teamSize?.max || 4;

    if (registrationData.teamMembers.length < maximumTeamSize - 1) {
      setRegistrationData((prev) => ({
        ...prev,
        teamMembers: [
          ...prev.teamMembers,
          { name: "", email: "", college: "" },
        ],
      }));
    }
  };

  const removeTeamMember = (index) => {
    const minimumTeamSize = event.teamSize?.min || 1;

    if (registrationData.teamMembers.length > minimumTeamSize - 1) {
      const updatedMembers = [...registrationData.teamMembers];
      updatedMembers.splice(index, 1);
      setRegistrationData((prev) => ({
        ...prev,
        teamMembers: updatedMembers,
      }));
    }
  };

  // Replace the existing handleSubmit function with this improved version
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({
      status: "submitting",
      message: "Submitting your registration...",
    });

    try {
      // Validate all required fields are filled
      const isTeamMembersValid = registrationData.teamMembers.every(
        (member) => member.name && member.email && member.college
      );

      if (
        !registrationData.teamName ||
        !registrationData.teamLeader.name ||
        !registrationData.teamLeader.email ||
        !registrationData.teamLeader.phone ||
        !isTeamMembersValid
      ) {
        throw new Error("Please fill all required fields");
      }

      // Create a new entry with the form data
      const response = await fetch(
        "https://pahal-backend.vercel.app/api/participants/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      // Show success animation and message
      setFormStatus({
        status: "success",
        message:
          "🎉 Team registered successfully! Get ready for an amazing experience!",
      });

      // Clear form and show a motivational message
      setTimeout(() => {
        setShowRegistrationForm(false);
        setFormStatus({ status: "idle", message: "" });
        // Show a motivational toast or notification
        showMotivationalMessage(event.title);
      }, 3000);
    } catch (error) {
      setFormStatus({
        status: "error",
        message: `Registration error: ${error.message}. Don't give up - try again!`,
      });
    }
  };

  // Add this new function to show motivational messages
  const showMotivationalMessage = (eventTitle) => {
    // Create a custom toast/notification element
    const notification = document.createElement("div");
    notification.className =
      "fixed bottom-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg shadow-lg z-50 animate-slide-up";

    // Random motivational messages
    const messages = [
      `Ready to shine at ${eventTitle}! Your journey to greatness begins now!`,
      `Team registered! Time to showcase your talents at ${eventTitle}!`,
      `Success! Your team is now part of ${eventTitle}. Let's make history together!`,
      `Registration complete! Prepare to amaze everyone at ${eventTitle}!`,
      `You're in! Get ready to push boundaries at ${eventTitle}!`,
    ];

    // Pick a random message
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    notification.innerHTML = `
    <div class="flex items-center">
      <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <div>
        <p class="font-bold">Registration Successful!</p>
        <p class="text-sm">${randomMessage}</p>
      </div>
    </div>
  `;

    document.body.appendChild(notification);

    // Remove the notification after 5 seconds
    setTimeout(() => {
      notification.classList.add("animate-slide-down");
      setTimeout(() => document.body.removeChild(notification), 500);
    }, 5000);
  };
  const nextStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setActiveStep((prev) => prev - 1);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        Loading event details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        Error loading event: {error}
      </div>
    );
  }

  if (!event) {
    return <div className="container mx-auto px-4 py-8">Event not found</div>;
  }

  const minimumTeamSize = event.teamSize?.min || 1;
  const maximumTeamSize = event.teamSize?.max || 4;

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
              <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b pb-2">
                Event Overview
              </h2>
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
              <button
                onClick={handleRegistrationClick}
                className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center"
              >
                <span>Register Your Team</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Additional Resources - Optional */}
            {event.resources && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  Resources
                </h3>
                <ul className="space-y-2">
                  {event.resources.map((resource, index) => {
                    const IconComponent = iconMap[resource.icon];

                    return (
                      <li key={index}>
                        <a
                          href={resource.url}
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          {IconComponent && (
                            <IconComponent className="h-4 w-4 mr-2" />
                          )}
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

      {/* Registration Modal */}
      <AnimatePresence>
        {showRegistrationForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Register for {event.title}
                  </h2>
                  <button
                    onClick={() => setShowRegistrationForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    {["Team Details", "Team Leader", "Team Members"].map(
                      (step, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              activeStep >= index
                                ? "bg-black text-white"
                                : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <span className="text-xs mt-1">{step}</span>
                        </div>
                      )
                    )}
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full">
                    <div
                      className="h-1 bg-black rounded-full transition-all duration-300"
                      style={{ width: `${(activeStep + 1) * 33.33}%` }}
                    ></div>
                  </div>
                </div>
                // Replace the form tag with this version
                <form
                  onSubmit={(e) => {
                    // Prevent default form submission on all steps
                    e.preventDefault();
 
                    if (activeStep === 2) {
                      handleSubmit(e);
                    } else { 
                      nextStep();
                    }
                  }}
                >
                  {/* Step 1: Team Details */}
                  {activeStep === 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                          Team Name
                        </label>
                        <input
                          type="text"
                          value={registrationData.teamName}
                          onChange={(e) =>
                            handleFormChange("teamName", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Enter your team name"
                          required
                        />
                      </div>
                      <div>
                        <p className="text-gray-700 text-sm">
                          <span className="font-semibold">Team Size:</span>{" "}
                          {minimumTeamSize} - {maximumTeamSize} members
                          (including team leader)
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Team Leader Information */}
                  {activeStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                          Team Leader Name
                        </label>
                        <input
                          type="text"
                          value={registrationData.teamLeader.name}
                          onChange={(e) =>
                            handleTeamLeaderChange("name", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Enter team leader's name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={registrationData.teamLeader.email}
                          onChange={(e) =>
                            handleTeamLeaderChange("email", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Enter team leader's email"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={registrationData.teamLeader.phone}
                          onChange={(e) =>
                            handleTeamLeaderChange("phone", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Enter team leader's phone number"
                          required
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Team Members */}
                  {activeStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Team Members</h3>
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            onClick={addTeamMember}
                            disabled={
                              registrationData.teamMembers.length >=
                              maximumTeamSize - 1
                            }
                            className={`flex items-center p-2 rounded-lg text-white ${
                              registrationData.teamMembers.length >=
                              maximumTeamSize - 1
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                            }`}
                          >
                            <UserPlus size={16} className="mr-1" />
                            <span>Add Member</span>
                          </button>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600 mb-4">
                        You need at least {minimumTeamSize - 1} more team member
                        {minimumTeamSize - 1 !== 1 ? "s" : ""}. You can add up
                        to {maximumTeamSize - 1} team member
                        {maximumTeamSize - 1 !== 1 ? "s" : ""}.
                      </div>

                      {registrationData.teamMembers.length === 0 ? (
                        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                          <p className="text-gray-500">
                            No team members added yet
                          </p>
                          <button
                            type="button"
                            onClick={addTeamMember}
                            className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                          >
                            Add Your First Team Member
                          </button>
                        </div>
                      ) : (
                        <AnimatePresence>
                          {registrationData.teamMembers.map((member, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="p-4 border border-gray-200 rounded-lg mb-4"
                            >
                              <div className="flex justify-between items-center mb-3">
                                <h4 className="font-semibold">
                                  Team Member #{index + 1}
                                </h4>
                                <button
                                  type="button"
                                  onClick={() => removeTeamMember(index)}
                                  className="text-red-500 hover:text-red-700 p-1"
                                  disabled={
                                    registrationData.teamMembers.length <=
                                    minimumTeamSize - 1
                                  }
                                >
                                  <UserMinus size={16} />
                                </button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-gray-700 text-xs font-medium mb-1">
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    value={member.name}
                                    onChange={(e) =>
                                      handleTeamMemberChange(
                                        index,
                                        "name",
                                        e.target.value
                                      )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="Enter member's name"
                                    required
                                  />
                                </div>
                                <div>
                                  <label className="block text-gray-700 text-xs font-medium mb-1">
                                    Email
                                  </label>
                                  <input
                                    type="email"
                                    value={member.email}
                                    onChange={(e) =>
                                      handleTeamMemberChange(
                                        index,
                                        "email",
                                        e.target.value
                                      )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="Enter member's email"
                                    required
                                  />
                                </div>
                                <div className="md:col-span-2">
                                  <label className="block text-gray-700 text-xs font-medium mb-1">
                                    College
                                  </label>
                                  <input
                                    type="text"
                                    value={member.college}
                                    onChange={(e) =>
                                      handleTeamMemberChange(
                                        index,
                                        "college",
                                        e.target.value
                                      )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="Enter member's college"
                                    required
                                  />
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      )}

                      {registrationData.teamMembers.length <
                        minimumTeamSize - 1 && (
                        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-lg text-sm">
                          You need to add at least{" "}
                          {minimumTeamSize -
                            1 -
                            registrationData.teamMembers.length}{" "}
                          more team member(s).
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Form Status Messages */}
                  {/* Replace the existing Form Status Messages section with this enhanced version */}
                  {formStatus.status !== "idle" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-4 p-4 rounded-lg text-sm ${
                        formStatus.status === "submitting"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : formStatus.status === "success"
                          ? "bg-gradient-to-r from-green-50 to-emerald-50 text-emerald-700 border border-green-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      <div className="flex items-center">
                        {formStatus.status === "submitting" && (
                          <div className="mr-3">
                            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                        {formStatus.status === "success" && (
                          <div className="mr-3">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 15,
                              }}
                              className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center"
                            >
                              <Check size={14} className="text-white" />
                            </motion.div>
                          </div>
                        )}
                        {formStatus.status === "error" && (
                          <div className="mr-3">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 15,
                              }}
                              className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                            >
                              <X size={14} className="text-white" />
                            </motion.div>
                          </div>
                        )}
                        <span>{formStatus.message}</span>
                      </div>

                      {formStatus.status === "success" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ delay: 0.3 }}
                          className="mt-3 text-center"
                        >
                          <p className="font-medium text-emerald-700">
                            Get ready for an incredible experience!
                          </p>
                          <div className="flex justify-center mt-2 space-x-1">
                            {[0, 1, 2, 3, 4].map((i) => (
                              <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                className="w-2 h-2 bg-emerald-500 rounded-full"
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Form Navigation Buttons */}
                  <div className="flex justify-between mt-8">
                    {activeStep > 0 ? (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                      >
                        Back
                      </button>
                    ) : (
                      <div></div>
                    )}
                    {activeStep < 2 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                        disabled={
                          (activeStep === 0 && !registrationData.teamName) ||
                          (activeStep === 1 &&
                            (!registrationData.teamLeader.name ||
                              !registrationData.teamLeader.email ||
                              !registrationData.teamLeader.phone))
                        }
                      >
                        Continue
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className={`px-6 py-2 rounded-lg transition flex items-center justify-center ${
                          formStatus.status === "submitting" ||
                          registrationData.teamMembers.length <
                            minimumTeamSize - 1 ||
                          registrationData.teamMembers.some(
                            (member) =>
                              !member.name || !member.email || !member.college
                          )
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-black to-gray-800 text-white hover:from-gray-800 hover:to-black"
                        }`}
                        disabled={
                          formStatus.status === "submitting" ||
                          registrationData.teamMembers.length <
                            minimumTeamSize - 1 ||
                          registrationData.teamMembers.some(
                            (member) =>
                              !member.name || !member.email || !member.college
                          )
                        }
                      >
                        {formStatus.status === "submitting" ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <span className="mr-1">Join The Adventure</span>
                            <motion.svg
                              animate={{ x: [0, 4, 0] }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </motion.svg>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default EventDetails;
