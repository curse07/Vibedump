import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fffbf4' }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-12 py-6" style={{ backgroundColor: '#fffbf4' }}>
        <div className="flex items-center justify-between border-b pb-6" style={{ borderColor: '#460c61' }}>
          <div className="flex items-center space-x-1">
            <img src="/public/Screenshot 2025-07-10 194051.png" alt="VibeDump Logo" className="w-8 h-8" />
            <span style={{ color: '#460c61', fontFamily: 'Arial, sans-serif', fontSize: '19px', fontWeight: 590 }}>VentSpace</span>
          </div>
          <nav className="flex items-center space-x-8">
            <a href="#" className="font-medium" style={{ color: '#460c61', fontFamily: 'Avenir Light, sans-serif', fontSize: '19px', fontWeight: 590 }}>
              Log in
            </a>
            <a href="#" className="font-medium" style={{ color: '#460c61', fontFamily: 'Avenir Light, sans-serif', fontSize: '19px', fontWeight: 590 }}>
              Blogs
            </a>
            <a href="#" className="font-medium" style={{ color: '#460c61', fontFamily: 'Avenir Light, sans-serif', fontSize: '19px', fontWeight: 590 }}>
              Help
            </a>
            <a href="#" className="font-medium" style={{ color: '#460c61', fontFamily: 'Avenir Light, sans-serif', fontSize: '19px', fontWeight: 590 }}>
              Contact us
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-12 py-20 pt-48">
        <div className="max-w-4xl text-center">
          <h1 className="mb-16 leading-tight animate-expand" style={{ color: '#460c61', fontFamily: 'Palatino Linotype, serif', fontSize: '5.5rem' }}>
            Vent. Reflect. Heal.
          </h1>

          <p className="mb-16 max-w-3xl mx-auto leading-relaxed font-medium" style={{ color: '#460c61', fontFamily: 'Avenir Light, sans-serif', fontSize: '19px', fontWeight: 590 }}>
            A safe, anonymous space where you can express thoughts, emotions, and personal stories
            with support from an AI that listens and a community that supports you.
          </p>

          <div className="flex items-center justify-center space-x-6">
            <button className="text-white px-8 py-4 text-lg font-medium border-2 transition-all duration-200 hover:bg-white"
              style={{
                backgroundColor: '#460c61',
                borderColor: '#460c61',
                borderRadius: '5px',
                fontFamily: 'Avenir Light, sans-serif',
                fontSize: '16px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fffbf4';
                e.currentTarget.style.color = '#460c61';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#460c61';
                e.currentTarget.style.color = '#fffbf4';
              }}>
              Start Venting with AI
            </button>
            <button className="text-white px-8 py-4 text-lg font-medium border-2 transition-all duration-200"
              style={{
                backgroundColor: '#460c61',
                borderColor: '#460c61',
                borderRadius: '5px',
                fontFamily: 'Avenir Light, sans-serif',
                fontSize: '16px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fffbf4';
                e.currentTarget.style.color = '#460c61';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#460c61';
                e.currentTarget.style.color = '#fffbf4';
              }}>
              Join Communities
            </button>
          </div>
        </div>
      </main>

      {/* Forest Background Section */}
      <section className="w-full mt-12">
        <div
          className="w-full h-[70vh] bg-cover bg-center bg-no-repeat relative flex items-center justify-center"
          style={{
            backgroundImage: 'url(/public/a3c153_e48867de15e3448fb46666ec0297b5f6~mv2.jpg)'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>

          <button className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200 z-10"
            onClick={() => {
              console.log('Previous slide');
            }}>
            <ChevronLeft size={48} strokeWidth={1.5} />
          </button>

          <button className="absolute right-8 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200 z-10"
            onClick={() => {
              console.log('Next slide');
            }}>
            <ChevronRight size={48} strokeWidth={1.5} />
          </button>

          <div className="text-center relative z-20">
            <h2 className="text-white text-7xl font-bold leading-tight" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              You are not alone.<br />
              This is your safe<br />
              space.
            </h2>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section className="w-full py-20 px-12" style={{ backgroundColor: '#fffbf4' }}>
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <h2 className="text-left mb-16" style={{ color: '#460c61', fontFamily: 'League Spartan, sans-serif', fontSize: '2.5rem', fontWeight: 600 }}>
            Blogs
          </h2>

          {/* Blog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {/* Blog Card 1 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
              <div className="h-24 mb-4 flex items-center">
                <h3 className="leading-tight" style={{ color: '#460c61', fontFamily: 'Avenir Light, sans-serif', fontSize: '1.5rem', fontWeight: 600, lineHeight: '1.3' }}>
                  Understanding Anxiety: A Comprehensive Guide to Managing Daily Stress
                </h3>
              </div>
              <div className="h-32 mb-6 flex items-start">
                <p className="leading-relaxed" style={{ color: '#460c61', fontFamily: 'Avenir Light, sans-serif', fontSize: '1rem', fontWeight: 400, lineHeight: '1.6' }}>
                  Learn practical techniques for managing anxiety and building resilience in your daily life. Discover breathing exercises, mindfulness practices, and coping strategies.
                </p>
              </div>
              <div className="h-20 flex flex-col justify-between mt-auto">
                <p className="mb-4" style={{ color: '#460c61', fontFamily: 'Avenir Light, sans-serif', fontSize: '1rem', fontWeight: 600 }}>
                  Dr. Sarah Chen
                </p>
                <button className="w-full text-white py-3 px-6 text-base font-medium border-2 transition-all duration-200 hover:bg-white"
                  style={{
                    backgroundColor: '#460c61',
                    borderColor: '#460c61',
                    borderRadius: '5px',
                    fontFamily: 'Avenir Light, sans-serif',
                    fontSize: '16px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = '#460c61';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#460c61';
                    e.currentTarget.style.color = 'white';
                  }}>
                  Read Article
                </button>
              </div>
            </div>

            {/* Blog Card 2 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
              <div className="h-24 mb-4 flex items-center">
                <h3 className="leading-tight" style={{ color: '#460c61', fontFamily: 'Avenir Light, sans-serif', fontSize: '1.5rem', fontWeight: 600, lineHeight: '1.3' }}>
                  The Power of Community in Mental Health Recovery
                </h3>
              </div>
              <div className="h-32 mb-6 flex items-start">
                <p className="leading-relaxed" style={{ color: '#460c61', fontFamily: 'Avenir Light, sans-serif', fontSize: '1rem', fontWeight: 400, lineHeight: '1.6' }}>
                  Explore how connecting with others can accelerate healing and provide crucial support during difficult times. Real stories from community members.
                </p>
              </div>
              <div className="h-20 flex flex-col justify-between mt-auto">
                <p className="mb-4" style={{ color: '#460c61', fontFamily: 'Avenir Light, sans-serif', fontSize: '1rem', fontWeight: 600 }}>
                  Marcus Johnson
                </p>
                <button className="w-full text-white py-3 px-6 text-base font-medium border-2 transition-all duration-200 hover:bg-white"
                  style={{
                    backgroundColor: '#460c61',
                    borderColor: '#460c61',
                    borderRadius: '5px',
                    fontFamily: 'Avenir Light, sans-serif',
                    fontSize: '16px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = '#460c61';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#460c61';
                    e.currentTarget.style.color = 'white';
                  }}>
                  Read Article
                </button>
              </div>
            </div>

            {/* Blog Card 3 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
              <div className="h-24 mb-4 flex items-center">
                <h3 className="leading-tight" style={{ color: '#460c61', fontFamily: 'Avenir Light, sans-serif', fontSize: '1.5rem', fontWeight: 600, lineHeight: '1.3' }}>
                  Mindfulness Practices for Emotional Regulation
                </h3>
              </div>
              <div className="h-32 mb-6 flex items-start">
                <p className="leading-relaxed" style={{ color: '#460c61', fontFamily: 'Avenir Light, sans-serif', fontSize: '1rem', fontWeight: 400, lineHeight: '1.6' }}>
                  Learn practical techniques for managing anxiety and building resilience in your daily life. Discover breathing exercises, mindfulness practices, and coping strategies.
                </p>
              </div>
              <div className="h-20 flex flex-col justify-between mt-auto">
                <p className="mb-4" style={{ color: '#460c61', fontFamily: 'Avenir Light, sans-serif', fontSize: '1rem', fontWeight: 600 }}>
                  Dr. Sarah Chen
                </p>
                <button className="w-full text-white py-3 px-6 text-base font-medium border-2 transition-all duration-200 hover:bg-white"
                  style={{
                    backgroundColor: '#460c61',
                    borderColor: '#460c61',
                    borderRadius: '5px',
                    fontFamily: 'Avenir Light, sans-serif',
                    fontSize: '16px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = '#460c61';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#460c61';
                    e.currentTarget.style.color = 'white';
                  }}>
                  Read Article
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission in Action Section */}
      <section className="w-full py-20 px-12" style={{ backgroundColor: '#fffbf4' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              <h2 className="leading-tight" style={{ 
                color: '#460c61', 
                fontFamily: 'League Spartan, sans-serif', 
                fontSize: '4rem', 
                fontWeight: 700,
                lineHeight: '1.1'
              }}>
                Our<br />
                Mission in<br />
                Action
              </h2>
              
              <div className="space-y-6">
                <p className="leading-relaxed" style={{ 
                  color: '#460c61', 
                  fontFamily: 'Avenir Light, sans-serif', 
                  fontSize: '1.125rem', 
                  fontWeight: 400,
                  lineHeight: '1.7'
                }}>
                  At VibeDump, we are dedicated to creating a safe space for individuals to share their personal stories and experiences. Our platform is designed to provide a supportive community that values your voice and aims to help you navigate through challenges.
                </p>
                
                <p className="leading-relaxed" style={{ 
                  color: '#460c61', 
                  fontFamily: 'Avenir Light, sans-serif', 
                  fontSize: '1.125rem', 
                  fontWeight: 400,
                  lineHeight: '1.7'
                }}>
                  Through transparency and empathy, we strive to foster a culture of understanding, growth, and connection among our users.
                </p>
              </div>
            </div>
            
            {/* Right Column - Image */}
            <div className="flex justify-center lg:justify-end">
              <img 
                src="https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Smartphone displaying app interface" 
                className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
