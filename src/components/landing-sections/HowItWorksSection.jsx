import React from 'react';
import { FiUserPlus, FiUploadCloud, FiMonitor, FiTrendingUp } from 'react-icons/fi';
import { FaMobileAlt, FaChartLine, FaHandshake } from 'react-icons/fa';

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      icon: <FiUserPlus className="text-3xl" />,
      title: "Sign Up & Onboard",
      description: "Create your account and set up your farm profile with basic information about your land and crops.",
      color: "from-emerald-500 to-green-500",
      features: ["Free Account", "15-min Setup", "No Credit Card"]
    },
    {
      number: "02",
      icon: <FiUploadCloud className="text-3xl" />,
      title: "Connect Your Farm",
      description: "Install our IoT sensors and connect them to our platform for real-time data collection.",
      color: "from-blue-500 to-cyan-500",
      features: ["IoT Installation", "Data Integration", "Mobile App"]
    },
    {
      number: "03",
      icon: <FiMonitor className="text-3xl" />,
      title: "Monitor & Analyze",
      description: "Use our dashboard to track crop health, soil conditions, and weather patterns in real-time.",
      color: "from-purple-500 to-pink-500",
      features: ["Real-time Data", "AI Insights", "Alerts"]
    },
    {
      number: "04",
      icon: <FaChartLine className="text-3xl" />,
      title: "Optimize & Grow",
      description: "Implement our recommendations to improve yields and connect with markets for better prices.",
      color: "from-amber-500 to-orange-500",
      features: ["Smart Decisions", "Market Access", "Higher Profits"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How 
            <span className="text-emerald-600"> AgnaGrow </span>
            Works
          </h2>
          <p className="text-xl text-gray-600">
            Simple steps to transform your farming operations and maximize your profits
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-24 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-amber-500 rounded-full z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-6">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                      {step.number}
                    </div>
                  </div>
                  
                  {/* Icon */}
                  <div className={`inline-flex p-4 bg-gradient-to-br ${step.color} text-white rounded-xl mb-6 mt-4`}>
                    {step.icon}
                  </div>
                  
                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {step.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-2">
                    {step.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-6">
                    <div className="text-emerald-500">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-20 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-100">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Ready to Transform Your Farming?
              </h3>
              <p className="text-gray-600">
                Join thousands of farmers who are already growing smarter with AgnaGrow
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                Start Free Trial
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-8 rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-lg">
                Scheduled Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;