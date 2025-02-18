import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import Lottie from 'react-lottie';
import contactAnimation from '../assets/contact-animation.json';  

const ContactUs = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: contactAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden relative">
      {/* Animated tech particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.2 + 0.1,
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            style={{
              width: Math.random() * 40 + 10 + 'px',
              height: Math.random() * 40 + 10 + 'px',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-300 mb-4">
            Connect With Us
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto text-purple-200">
            Got questions about Pahal Intercollegiate Competition? We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex flex-col items-center">
              <div className="w-72 h-72">
                <Lottie options={defaultOptions} />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 space-y-6">
              <h2 className="text-2xl font-bold mb-4">Reach Out</h2>
              
              <motion.div 
                className="flex items-center space-x-4"
                whileHover={{ x: 5 }}
              >
                <div className="bg-indigo-600 p-3 rounded-full">
                  <FaMapMarkerAlt className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold">CIMDR College</h3>
                  <p className="text-purple-200">123 Innovation Way, Tech Hub, India</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-4"
                whileHover={{ x: 5 }}
              >
                <div className="bg-indigo-600 p-3 rounded-full">
                  <FaPhone className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold">Call Us</h3>
                  <p className="text-purple-200">+91 9876543210</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-4"
                whileHover={{ x: 5 }}
              >
                <div className="bg-indigo-600 p-3 rounded-full">
                  <FaEnvelope className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-purple-200">pahal@cimdr.edu.in</p>
                </div>
              </motion.div>
            </div>

            <div className="flex justify-center space-x-6">
              <motion.a
                href="#"
                whileHover={{ y: -5, scale: 1.1 }}
                className="bg-white/10 p-3 rounded-full"
              >
                <FaLinkedin className="text-2xl text-blue-300" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -5, scale: 1.1 }}
                className="bg-white/10 p-3 rounded-full"
              >
                <FaTwitter className="text-2xl text-cyan-300" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -5, scale: 1.1 }}
                className="bg-white/10 p-3 rounded-full"
              >
                <FaInstagram className="text-2xl text-pink-300" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500 rounded-full opacity-20 blur-xl" />
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-500 rounded-full opacity-20 blur-xl" />
              
              <h2 className="text-2xl font-bold mb-6 relative z-10">Send us a message</h2>
              
              <AnimatePresence>
                {!isSubmitted ? (
                  <motion.form 
                    onSubmit={handleSubmit}
                    className="space-y-6 relative z-10"
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Your Name</label>
                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                        className="relative"
                      >
                        <input
                          type="text"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-purple-300/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                          placeholder="Enter your name"
                          required
                        />
                      </motion.div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Email Address</label>
                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                        className="relative"
                      >
                        <input
                          type="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-purple-300/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                          placeholder="Enter your email"
                          required
                        />
                      </motion.div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Subject</label>
                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                        className="relative"
                      >
                        <input
                          type="text"
                          name="subject"
                          value={formState.subject}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-purple-300/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                          placeholder="What's this about?"
                          required
                        />
                      </motion.div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Message</label>
                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                        className="relative"
                      >
                        <textarea
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          rows={5}
                          className="w-full bg-white/5 border border-purple-300/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                          placeholder="Tell us what you need..."
                          required
                        />
                      </motion.div>
                    </div>
                    
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 px-6 rounded-lg text-center transition-all ${
                        isSubmitting 
                          ? 'bg-purple-700' 
                          : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500'
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="flex justify-center items-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white"></div>
                        </div>
                      ) : (
                        'Send Message'
                      )}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-purple-200">
                      Thank you for contacting us. We'll get back to you shortly.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Visit Us at Pahal 2025</h2>
          
          <div className="relative h-96 overflow-hidden rounded-xl shadow-2xl">
            <iframe
              title="Pahal Event Location"
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.1387400336747!2d77.2273347!3d28.6129167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzQ2LjUiTiA3N8KwMTMnMzguNSJF!5e0!3m2!1sen!2sin!4v1677154541540!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            
            <motion.div 
              className="absolute top-4 left-4 bg-indigo-900/80 backdrop-blur-sm rounded-lg p-4 max-w-xs shadow-lg"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h3 className="font-semibold text-xl mb-2">CIMDR College</h3>
              <p className="text-sm text-indigo-100">
                Join us for Pahal Intercollegiate Competition, showcasing the best 
                innovation and technology projects from across the country.
              </p>
            </motion.div>
          </div>
        </motion.div>
        
        {/* FAQ section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "When is the next Pahal competition?",
                answer: "The next Pahal Intercollegiate Competition is scheduled to take place from March 15-17, 2025 at CIMDR College campus."
              },
              {
                question: "How can I register for Pahal?",
                answer: "Registration opens two months before the event. You can register through our website or by contacting your college's student coordinator."
              },
              {
                question: "Is there a participation fee?",
                answer: "Yes, there is a nominal participation fee that varies based on the events you register for. Early bird registrations get special discounts."
              },
              {
                question: "Can students from any college participate?",
                answer: "Yes, Pahal is open to students from all recognized colleges and universities across the country."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 transition-all"
              >
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-purple-200">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
 
    </div>
  );
};

export default ContactUs;