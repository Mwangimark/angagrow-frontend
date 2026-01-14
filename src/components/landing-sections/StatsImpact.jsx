import React, { useEffect, useRef, useState } from 'react'
import { FaSeedling, FaChartLine, FaTractor, FaLeaf } from 'react-icons/fa';
import { FiTrendingUp, FiUsers, FiDollarSign, FiGlobe } from 'react-icons/fi';
import { useInView } from 'framer-motion';

const StatsImpact = () => {
  const containerRef = useRef(null);
  const [counted, setCounted] = useState(false);

  // Parse numbers from values
  const parseNumber = (value) => {
    if (value.includes('KES')) {
      return parseFloat(value.replace('KES ', '').replace('B', '').trim()) * 1000000000;
    } else if (value.includes('+')) {
      return parseFloat(value.replace(',', '').replace('+', ''));
    } else if (value.includes('%')) {
      return parseFloat(value.replace('%', ''));
    } else if (value.includes('K')) {
      return parseFloat(value.replace('K', '').replace(',', '')) * 1000;
    } else if (value.includes('M')) {
      return parseFloat(value.replace('M', '').replace(',', '')) * 1000000;
    } else {
      return parseFloat(value.replace(',', ''));
    }
  };

  // Format numbers back to display format
  const formatNumber = (value, original) => {
    if (original.includes('KES')) {
      const billions = value / 1000000000;
      return `KES ${billions.toFixed(billions >= 10 ? 0 : 1)}B`;
    } else if (original.includes('+')) {
      return `${Math.floor(value).toLocaleString()}+`;
    } else if (original.includes('%')) {
      return `${Math.floor(value)}%`;
    } else if (original.includes('K')) {
      return `${Math.floor(value / 1000).toLocaleString()}K+`;
    } else if (original.includes('M')) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else {
      return Math.floor(value).toLocaleString();
    }
  };

  // Stats data with original values and numeric targets
  const statsData = [
    {
      icon: <FaSeedling className="text-3xl" />,
      value: "10+",
      numericValue: 10,
      label: "Active Farms",
      change: "+25% this year",
      color: "from-emerald-500 to-green-500",
      description: "Farms using our platform",
      duration: 2000,
      ease: "power2.out"
    },
    {
      icon: <FiTrendingUp className="text-3xl" />,
      value: "KES 2.5B",
      numericValue: 2500000000, 
      label: "Farmer Revenue",
      change: "+20% growth",
      color: "from-amber-500 to-orange-500",
      description: "Generated through platform",
      duration: 2500,
      ease: "power2.out"
    },
    {
      icon: <FiUsers className="text-3xl" />,
      value: "500+",
      numericValue: 500,
      label: "Farmers Empowered",
      change: "+15,000 new users",
      color: "from-blue-500 to-cyan-500",
      description: "Across East Africa",
      duration: 2000,
      ease: "power2.out"
    },
    {
      icon: <FaChartLine className="text-3xl" />,
      value: "20%",
      numericValue: 20,
      label: "Average Yield Increase",
      change: "Industry leading",
      color: "from-purple-500 to-pink-500",
      description: "For AngaGRow users",
      duration: 1500,
      ease: "power2.out"
    },
    {
      icon: <FaTractor className="text-3xl" />,
      value: "5K+",
      numericValue: 5000,
      label: "Acres Monitored",
      change: "+150K acres",
      color: "from-teal-500 to-emerald-500",
      description: "Using IoT sensors",
      duration: 2200,
      ease: "power2.out"
    },
    {
      icon: <FiDollarSign className="text-3xl" />,
      value: "18%",
      numericValue: 18,
      label: "Cost Reduction",
      change: "Average savings",
      color: "from-red-500 to-rose-500",
      description: "For farmers",
      duration: 1500,
      ease: "power2.out"
    },
    {
      icon: <FiGlobe className="text-3xl" />,
      value: "8",
      numericValue: 8,
      label: "Countries",
      change: "Expanding globally",
      color: "from-indigo-500 to-blue-500",
      description: "Serving farmers",
      duration: 1800,
      ease: "power2.out"
    },
    {
      icon: <FaLeaf className="text-3xl" />,
      value: "2,500",
      numericValue: 2500,
      label: "Trees Planted",
      change: "Sustainability effort",
      color: "from-green-500 to-emerald-500",
      description: "Through our program",
      duration: 2300,
      ease: "power2.out"
    }
  ];

  // State for animated values
  const [animatedValues, setAnimatedValues] = useState(
    statsData.map(stat => ({
      current: 0,
      target: stat.numericValue,
      format: stat.value,
      duration: stat.duration
    }))
  );

  // Intersection Observer for scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !counted) {
            setCounted(true);

            // Start counting animations
            statsData.forEach((stat, index) => {
              const startTime = Date.now();
              const duration = stat.duration;
              const startValue = 0;
              const endValue = stat.numericValue;

              const animate = () => {
                const currentTime = Date.now();
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function
                const easeOutQuad = (t) => t * (2 - t);
                const easedProgress = easeOutQuad(progress);

                const currentValue = startValue + (endValue - startValue) * easedProgress;

                setAnimatedValues(prev => {
                  const newValues = [...prev];
                  newValues[index] = {
                    ...newValues[index],
                    current: currentValue
                  };
                  return newValues;
                });

                if (progress < 1) {
                  requestAnimationFrame(animate);
                }
              };

              // Stagger the animations
              setTimeout(() => {
                requestAnimationFrame(animate);
              }, index * 100); // 100ms delay between each stat
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [counted]);

  return (
    <div ref={containerRef} className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">


        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Making an Impact
          <span className="relative">
            <span className="text-emerald-600 ml-3">That Counts</span>
            <svg
              className="absolute -bottom-3 left-0 w-full h-2"
              viewBox="0 0 200 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,5 Q100,15 200,5"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h2>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          See how AngaGrow is transforming agriculture across Africa with measurable results
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="relative bg-white p-6 rounded-2xl border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden"
          >
            {/* Background gradient effect */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stat.color}`}></div>

            {/* Animated counting background */}
            <div
              className={`absolute inset-0 opacity-5 bg-gradient-to-br ${stat.color} transition-all duration-1000 ${counted ? 'scale-100' : 'scale-0'}`}
            ></div>

            {/* Icon with animated pulse */}
            <div className={`relative inline-flex p-4 bg-gradient-to-br ${stat.color} text-white rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
              {stat.icon}
              {counted && (
                <div className="absolute inset-0 rounded-2xl border-2 border-white/30 animate-ping opacity-50"></div>
              )}
            </div>

            {/* Animated value */}
            <div className="relative">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 min-h-[3.5rem] flex items-center">
                {formatNumber(animatedValues[index].current, stat.value)}
              </div>

              {/* Counting animation indicator */}
              <div className="flex items-center gap-2 mb-3">
                <div className="text-lg font-semibold text-gray-800">
                  {stat.label}
                </div>
                {animatedValues[index].current < stat.numericValue && counted && (
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                )}
              </div>
            </div>

            {/* Change indicator */}
            <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium mb-3">
              <div className="p-1.5 bg-emerald-100 rounded-full">
                <FiTrendingUp className="text-emerald-600" />
              </div>
              <span>{stat.change}</span>
            </div>

            {/* Description */}
            <div className="text-gray-600 text-sm mb-2">
              {stat.description}
            </div>

            {/* Progress bar for counting animation */}
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-4 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${stat.color} transition-all duration-1000 ease-out`}
                style={{
                  width: counted ? '100%' : '0%',
                  transition: `width ${stat.duration}ms ${stat.ease} ${index * 100}ms`
                }}
              ></div>
            </div>

            {/* Decorative corner */}
            <div className={`absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-md group-hover:opacity-20 transition-opacity duration-300`}></div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default StatsImpact;