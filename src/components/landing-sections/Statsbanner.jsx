import React, { useState, useEffect, useRef } from 'react';

// Enhanced Counter Component with individual scroll detection
const Counter = ({ end, duration = 10000, suffix = "", icon }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const counterRef = useRef(null);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          
          let start = 0;
          const increment = end / (duration / 30);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 30);

          return () => clearInterval(timer);
        }
      },
      { 
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [end, duration, hasStarted]);

  return (
    <div ref={counterRef} className="text-4xl font-bold mb-2">
      {formatNumber(count)}{suffix}
    </div>
  );
};

const StatsBanner = () => {
  const stats = [
    { 
      value: 10000, 
      label: "Active Farms", 
      icon: "🏡", 
      description: "and growing daily",
      suffix: "+",
      duration: 4000,
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-300"
    },
    { 
      value: 40, 
      label: "Cost Reduction", 
      icon: "💰", 
      description: "average savings",
      suffix: "%",
      duration: 2500,
      iconBg: "bg-teal-500/20",
      iconColor: "text-teal-300"
    },
    { 
      value: 500000, 
      label: "Acres Monitored", 
      icon: "🌾", 
      description: "and counting",
      suffix: "+",
      duration: 5000,
      iconBg: "bg-green-500/20",
      iconColor: "text-green-300"
    },
    { 
      value: 24, 
      label: "Support", 
      icon: "🛠️", 
      description: "always available",
      suffix: "/7",
      duration: 2000,
      iconBg: "bg-cyan-500/20",
      iconColor: "text-cyan-300"
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl mt-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}>
      </div>
      
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 animate-gradient-x"></div>
      
      {/* Main Banner Content */}
      <div className="relative p-8 md:p-10 lg:p-12 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center group relative"
            >
              {/* Icon Container */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">{stat.icon}</span>
              </div>
              
              {/* Animated Counter - Now triggered individually on scroll */}
              <Counter 
                end={stat.value} 
                duration={stat.duration}
                suffix={stat.suffix}
                icon={stat.icon}
              />
              
              {/* Label with underline effect */}
              <div className="relative inline-block">
                <div className="text-lg font-semibold mb-1 relative z-10">
                  {stat.label}
                </div>
                <div className={`absolute -bottom-1 left-0 w-0 group-hover:w-full h-1 ${stat.iconBg} rounded-full transition-all duration-500`}></div>
              </div>
              
              {/* Description */}
              <div className="text-emerald-100/80 text-sm mt-2">
                {stat.description}
              </div>
              
              {/* Hover Effect Glow */}
              <div className={`absolute -inset-4 rounded-2xl ${stat.iconBg} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10`}></div>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-10 pt-8 border-t border-emerald-500/30 text-center">
          <p className="text-emerald-100 text-lg md:text-xl mb-6 font-medium">
            Ready to join thousands of successful farmers using AngaGrow?
          </p>
          <button className="group bg-white text-emerald-700 hover:text-emerald-800 
            font-bold px-8 py-3 rounded-xl transition-all duration-300 
            transform hover:scale-105 shadow-xl hover:shadow-2xl relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Start Free Trial Today
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-teal-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <p className="text-emerald-200/70 text-sm mt-4">
            No credit card required • 30-day free trial • Cancel anytime
          </p>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl"></div>
      
      {/* Add animation style */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default StatsBanner;