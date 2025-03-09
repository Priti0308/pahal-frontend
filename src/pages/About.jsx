import React from 'react';

const AboutUs = () => {
  return (
    <div className="font-sans bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <img 
          // src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop" 
          // src="https://raw.githubusercontent.com/Mahesh-Langote/pahal-images/master/IMG_8887.JPG"
          src="https://raw.githubusercontent.com/Mahesh-Langote/pahal-images/master/IMG_9034.JPG"
          alt="Students participating in Pahal competition" 
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-700/70"></div>
        <div className="relative z-10 text-center max-w-4xl px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">About Pahal</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Shaping the future of innovation through India's premier intercollegiate competition since 2010
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary-800 mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Pahal was born in 2010 from a vision to create a platform where the brightest young minds across India could come together, collaborate, and compete in a celebration of innovation and academic excellence.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                What started as a small intercollegiate event at CIMDR with just 8 participating colleges has grown into one of India's most prestigious academic competitions, now hosting over 100 colleges and universities annually.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Over the years, Pahal has evolved to embrace emerging technologies and disciplines, while staying true to its core mission of fostering innovation, leadership, and collaborative problem-solving among future leaders.
              </p>
            </div>
            <div className="relative">
              <img 
                // src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070&auto=format&fit=crop"
                src="https://raw.githubusercontent.com/Mahesh-Langote/pahal-images/master/IMG_8858.JPG" 
                alt="First Pahal competition in 2010" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary-600 text-white px-6 py-3 rounded shadow-lg">
                <p className="font-semibold">Est. 2010</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 px-4 bg-primary-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">Our Mission & Values</h2>
            <p className="max-w-3xl mx-auto text-gray-700">
              Guided by our commitment to excellence and innovation, Pahal aims to create transformative experiences for students across India.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description: "We believe in pushing boundaries and encouraging creative solutions to complex problems. Pahal provides a platform for innovative ideas to flourish.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )
              },
              {
                title: "Collaboration",
                description: "We foster an environment where students from diverse backgrounds come together, share knowledge, and build lasting professional relationships.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              {
                title: "Excellence",
                description: "We strive for excellence in every aspect of Pahal, from the quality of the competitions to the experience of participants and the impact on their future careers.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                )
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact & Achievements */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">Our Impact & Achievements</h2>
            <p className="max-w-3xl mx-auto text-gray-700">
              Over the past decade, Pahal has made a significant impact on thousands of students and the broader academic community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <div className="grid grid-cols-2 gap-8 mb-12">
                {[
                  { number: "12+", label: "Years of Excellence" },
                  { number: "100+", label: "Participating Colleges" },
                  { number: "15,000+", label: "Student Participants" },
                  { number: "₹10M+", label: "In Prizes Awarded" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-4xl font-bold text-primary-600 mb-2">{stat.number}</p>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">National Recognition</h4>
                    <p className="text-gray-600">Recognized by the Ministry of Education as one of India's premier intercollegiate competitions.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">Industry Partnerships</h4>
                    <p className="text-gray-600">Collaborated with over 50 leading companies to provide real-world challenges and opportunities.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">Alumni Success</h4>
                    <p className="text-gray-600">Many Pahal alumni have gone on to found successful startups or secure leadership positions in top companies.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://raw.githubusercontent.com/Mahesh-Langote/pahal-images/master/IMG_8866.JPG" 
                alt="Students collaborating" 
                className="rounded-lg h-full object-cover"
              />
              <div className="space-y-4">
                <img 
                  src="https://raw.githubusercontent.com/Mahesh-Langote/pahal-images/master/IMG_9068.JPG" 
                  alt="Award ceremony" 
                  className="rounded-lg h-[48%] object-cover"
                />
                <img 
                  src="https://raw.githubusercontent.com/Mahesh-Langote/pahal-images/master/IMG_8883.JPG" 
                  alt="Students presenting" 
                  className="rounded-lg h-[48%] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competition Categories */}
      <section className="py-20 px-4 bg-primary-900 ">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Competition Categories</h2>
            <p className="max-w-3xl mx-auto text-primary-100">
              Pahal hosts competitions across multiple disciplines, challenging students to showcase their skills and creativity.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Tech Innovations",
                description: "Software development, AI solutions, and innovative tech projects.",
                icon: "💻",
                image: "https://raw.githubusercontent.com/Mahesh-Langote/pahal-images/master/IMG_8896.JPG"
              },
              {
                title: "Business Strategy",
                description: "Case studies, business plans, and entrepreneurial pitches.",
                icon: "📊",
                image: "https://raw.githubusercontent.com/Mahesh-Langote/pahal-images/master/IMG_9074.JPG"
              },
              {
                title: "Design Challenges",
                description: "Product design, UI/UX, architectural solutions, and creative problem-solving.",
                icon: "🎨",
                image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop"
              },
              {
                title: "Research Showcase",
                description: "Scientific research presentations and academic papers across disciplines.",
                icon: "🔬",
                image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070&auto=format&fit=crop"
              }
            ].map((category, index) => (
              <div key={index} className="group overflow-hidden rounded-lg relative">
                <img 
                  src={category.image}
                  alt={category.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 to-primary-900/30 flex flex-col justify-end p-6">
                  <div className="mb-2 text-3xl">{category.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-primary-100 text-sm">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">Meet Our Team</h2>
            <p className="max-w-3xl mx-auto text-gray-700">
              Pahal is organized by a dedicated team of faculty, staff, and student volunteers at CIMDR.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Dr. Anjali Sharma",
                role: "Faculty Director",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2076&auto=format&fit=crop"
              },
              {
                name: "Prof. Vikram Mehta",
                role: "Competition Coordinator",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
              },
              {
                name: "Priya Singh",
                role: "Student Lead",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
              },
              {
                name: "Ravi Kumar",
                role: "Technical Director",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-4 mx-auto rounded-full w-48 h-48 overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-primary-800 mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
                <div className="flex justify-center space-x-3 mt-3">
                  <a href="#" className="text-primary-600 hover:text-primary-800">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-primary-600 hover:text-primary-800">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-primary-600 hover:text-primary-800">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-primary-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">What Participants Say</h2>
            <p className="max-w-3xl mx-auto text-gray-700">
              Hear from past participants about their experiences at Pahal.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Participating in Pahal was a transformative experience. The challenges pushed me beyond my comfort zone, and the connections I made opened doors to incredible opportunities.",
                name: "Aanya Patel",
                college: "IIT Bombay",
                year: "2022 Participant",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
              },
              {
                quote: "The level of competition at Pahal is unmatched. It provides a perfect platform to benchmark your skills against the best minds in the country while learning and growing together.",
                name: "Rahul Sharma",
                college: "Delhi University",
                year: "2021 Participant",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
              },
              {
                quote: "What sets Pahal apart is how it simulates real-world challenges. The mentorship from industry experts and the collaborative environment prepared me for my career better than any classroom ever could.",
                name: "Nikhita Reddy",
                college: "BITS Pilani",
                year: "2020 Participant",
                image: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=2070&auto=format&fit=crop"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-200 absolute -top-4 -left-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <div className="mb-6 pt-4">
                  <p className="text-gray-600 italic leading-relaxed">{testimonial.quote}</p>
                </div>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <div className="text-gray-500 text-sm">{testimonial.college}, {testimonial.year}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     </div>
  );
}
export default AboutUs;