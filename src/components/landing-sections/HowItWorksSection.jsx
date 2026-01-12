import React, { useState, useEffect } from 'react';
import { UserPlus, Wifi, BarChart3, TrendingUp, Leaf, ArrowRight, CheckCircle } from 'lucide-react';
import { FiPlay, FiTarget } from 'react-icons/fi';

const HowItWorksSection = () => {
  const [hoveredStep, setHoveredStep] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Animation trigger when component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('how-it-works');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const steps = [
    {
      icon: UserPlus,
      title: "SIGN UP &",
      subtitle: "ONBOARD",
      color: "#10b981", // emerald
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      gradient: "from-emerald-500 to-teal-500",
      details: [
        "Create your free account in 2 minutes",
        "Set up farm profile with easy wizard",
        "Choose your plan (Free trial available)",
        "Complete guided onboarding"
      ]
    },
    {
      icon: Wifi,
      title: "CONNECT",
      subtitle: "YOUR FARM",
      color: "#3b82f6", // blue
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      gradient: "from-blue-500 to-cyan-500",
      details: [
        "Install IoT sensors (we provide guides)",
        "Connect weather stations automatically",
        "Download mobile app for on-the-go access",
        "Start real-time data collection"
      ]
    },
    {
      icon: BarChart3,
      title: "MONITOR &",
      subtitle: "ANALYZE",
      color: "#a855f7", // purple
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      gradient: "from-purple-500 to-pink-500",
      details: [
        "View comprehensive dashboard",
        "Track soil health & moisture levels",
        "Get AI-powered crop insights",
        "Receive smart alerts & notifications"
      ]
    },
    {
      icon: TrendingUp,
      title: "OPTIMIZE &",
      subtitle: "GROW",
      color: "#f59e0b", // amber
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      gradient: "from-amber-500 to-orange-500",
      details: [
        "Apply personalized recommendations",
        "Improve yields by up to 65%",
        "Access premium markets directly",
        "Maximize profits with data-driven decisions"
      ]
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-emerald-200/40 to-teal-200/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 px-5 py-2.5 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <div className="p-1 bg-white rounded-full">
              <FiTarget className="text-emerald-600" />
            </div>
            <span>Simple 4-Step Process</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            How 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              {' '}AngaGrow{' '}
            </span>
            Works
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your farming operations in four simple steps. From setup to harvest,
            we guide you every step of the way.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Logo at top center with connecting line */}
          <div className={`flex justify-center mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-xl border-2 border-emerald-200/50 flex items-center gap-3 group hover:shadow-2xl hover:scale-105 transition-all duration-300 relative">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">AngaGrow</span>
              <ArrowRight className="w-5 h-5 text-emerald-600 group-hover:translate-x-2 transition-transform" />
              
              {/* Connecting line from logo to timeline */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-0.5 h-8 border-l-2 border-dashed border-emerald-300"></div>
            </div>
          </div>

          {/* Steps Container with connecting timeline */}
          <div className="relative">
            {/* Main horizontal timeline line */}
            <div className="hidden lg:block absolute top-40 left-0 right-0">
              <div className="relative">
                {/* Dashed line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 border-t-2 border-dashed border-gray-300 transform -translate-y-1/2"></div>
                
                {/* Animated gradient overlay on hover */}
                <div 
                  className={`absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-emerald-500 via-blue-500 via-purple-500 to-amber-500 transform -translate-y-1/2 transition-all duration-1000 ${
                    isVisible ? 'w-full opacity-20' : 'w-0 opacity-0'
                  }`}
                  style={{ transitionDelay: '500ms' }}
                ></div>
              </div>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isHovered = hoveredStep === index;
                
                return (
                  <div 
                    key={index}
                    className={`relative transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                    onMouseEnter={() => setHoveredStep(index)}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    {/* Vertical connector to timeline (Desktop) */}
                    <div className="hidden lg:block absolute top-40 left-1/2 transform -translate-x-1/2">
                      <div className="relative">
                        {/* Line from timeline to circle */}
                        <div 
                          className={`w-0.5 h-16 mx-auto transition-all duration-500 ${
                            isHovered ? 'opacity-100' : 'opacity-70'
                          }`}
                          style={{ 
                            background: `linear-gradient(to bottom, ${step.color}40, ${step.color})`,
                            borderLeft: `2px dashed ${step.color}`
                          }}
                        ></div>
                        
                        {/* Step number circle */}
                        <div 
                          className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all duration-300 ${
                            isHovered ? 'scale-125 ring-4 ring-opacity-30' : 'scale-100'
                          }`} 
                          style={{ 
                            backgroundColor: step.color,
                            boxShadow: `0 0 20px ${step.color}40`,
                            ...(isHovered && { boxShadow: `0 0 30px ${step.color}60` })
                          }}
                        >
                          {index + 1}
                        </div>
                      </div>
                    </div>

                    {/* Mobile vertical connector */}
                    <div className="lg:hidden absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
                      <div className="w-0.5 h-8 border-l-2 border-dashed" style={{ borderColor: step.color }}></div>
                    </div>

                    {/* Main Card */}
                    <div className="relative pt-20 lg:pt-48">
                      {/* Icon with animated ring */}
                      <div className="relative mx-auto w-40 h-40 mb-8">
                        {/* Outer glow effect on hover */}
                        <div className={`absolute inset-0 rounded-full blur-xl transition-opacity duration-500 ${
                          isHovered ? 'opacity-40' : 'opacity-0'
                        }`} style={{ backgroundColor: step.color }}></div>
                        
                        {/* Progress ring */}
                        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                          <circle
                            cx="80"
                            cy="80"
                            r="72"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            className="text-gray-200"
                          />
                          <circle
                            cx="80"
                            cy="80"
                            r="72"
                            stroke={step.color}
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 72}`}
                            strokeDashoffset={`${2 * Math.PI * 72 * (1 - (isHovered ? 1 : 0.7))}`}
                            className="transition-all duration-700 ease-out"
                            strokeLinecap="round"
                          />
                        </svg>
                        
                        {/* Icon container */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div 
                            className={`w-32 h-32 bg-white rounded-full shadow-2xl flex items-center justify-center
                              border-4 transition-all duration-500 ${isHovered ? 'scale-110 shadow-2xl' : 'shadow-lg'}`}
                            style={{ borderColor: step.color }}
                          >
                            <div className={`p-6 rounded-full bg-gradient-to-br ${step.gradient} transition-transform duration-500 ${
                              isHovered ? 'scale-110' : ''
                            }`}>
                              <Icon className="w-12 h-12 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Title */}
                      <div className="text-center mb-6">
                        <h3 
                          className="text-2xl font-bold mb-1 transition-all duration-300"
                          style={{ color: step.color }}
                        >
                          {step.title}
                        </h3>
                        <h4 
                          className="text-xl font-bold text-gray-900"
                        >
                          {step.subtitle}
                        </h4>
                      </div>

                      {/* Details Card */}
                      <div 
                        className={`${step.bgColor} rounded-2xl p-6 border-2 transition-all duration-500
                          ${isHovered ? 'shadow-2xl scale-105' : 'shadow-lg'} ${step.borderColor}`}
                        style={{ borderColor: isHovered ? step.color : 'transparent' }}
                      >
                        <div className="space-y-4">
                          {step.details.map((detail, idx) => (
                            <div 
                              key={idx} 
                              className="flex items-start gap-4 transform transition-all duration-500"
                              style={{ 
                                transitionDelay: isHovered ? `${idx * 100}ms` : '0ms',
                                opacity: isHovered ? 1 : 0.8,
                                transform: isHovered ? 'translateX(0)' : 'translateX(-10px)'
                              }}
                            >
                              <div className="flex-shrink-0 mt-1">
                                <CheckCircle className="w-5 h-5" style={{ color: step.color }} />
                              </div>
                              <span className="text-sm text-gray-700 leading-tight font-medium">
                                {detail}
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        {/* CTA Button */}
                        <button 
                          className={`mt-6 w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                            isHovered 
                              ? 'text-white shadow-lg' 
                              : 'bg-white text-gray-700 border border-gray-200'
                          }`}
                          style={{ 
                            backgroundColor: isHovered ? step.color : 'transparent',
                            borderColor: isHovered ? step.color : '#e5e7eb'
                          }}
                        >
                          {isHovered ? 'Learn More' : 'View Details'}
                          <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                            isHovered ? 'translate-x-1' : ''
                          }`} />
                        </button>
                      </div>
                    </div>

                    {/* Arrow to next step (Desktop) */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-40 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                        <div 
                          className={`w-8 h-8 border-r-4 border-t-4 transform rotate-45 transition-all duration-300 ${
                            isHovered ? 'scale-125 opacity-100' : 'scale-100 opacity-70'
                          }`}
                          style={{ 
                            borderColor: step.color,
                            filter: isHovered ? `drop-shadow(0 0 8px ${step.color}40)` : 'none'
                          }}
                        ></div>
                      </div>
                    )}

                    {/* Arrow to next step (Mobile) */}
                    {index < steps.length - 1 && (
                      <div className="lg:hidden flex justify-center my-8">
                        <div className="text-emerald-500 animate-bounce">
                          <ArrowRight className="w-8 h-8 rotate-90" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className={`mt-20 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl px-6 py-5 shadow-xl border-2 border-emerald-100">
            <div className="flex items-center gap-2">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    hoveredStep === index ? 'scale-125' : ''
                  }`}
                  style={{ backgroundColor: hoveredStep === index ? step.color : '#9ca3af' }}
                ></div>
              ))}
            </div>
            <span className="text-gray-700 font-semibold">Hover over steps to explore details</span>
          </div>
        </div>
      </div>5
    </section>
  );
};

export default HowItWorksSection;