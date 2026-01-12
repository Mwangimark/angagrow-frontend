import React, { useEffect, useRef, useState } from 'react';

const StatsSection = () => {
  const containerRef = useRef(null);
  const [animatedPercentages, setAnimatedPercentages] = useState([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);

  const metrics = [
    { label: "Farm Onboarding", percentage: 85, color: "bg-emerald-300", duration: 1500 },
    { label: "Yield Improvement", percentage: 92, color: "bg-teal-300", duration: 1800 },
    { label: "Cost Reduction", percentage: 78, color: "bg-green-300", duration: 1600 },
    { label: "Market Access", percentage: 88, color: "bg-cyan-300", duration: 1700 },
  ];

  // Intersection Observer for scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Animate each progress bar
            metrics.forEach((metric, index) => {
              const startTime = Date.now();
              const duration = metric.duration;
              const startValue = 0;
              const endValue = metric.percentage;
              
              const animate = () => {
                const currentTime = Date.now();
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
                const easedProgress = easeOutQuart(progress);
                
                const currentValue = startValue + (endValue - startValue) * easedProgress;
                
                setAnimatedPercentages(prev => {
                  const newValues = [...prev];
                  newValues[index] = Math.floor(currentValue);
                  return newValues;
                });
                
                if (progress < 1) {
                  requestAnimationFrame(animate);
                }
              };
              
              // Stagger the animations
              setTimeout(() => {
                requestAnimationFrame(animate);
              }, index * 200);
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
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
  }, [hasAnimated]);

  return (
    <section className="py-0 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">

        {/* Progress Metrics */}
        <div ref={containerRef} className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-1 bg-emerald-300 rounded-full"></div>
                <span className="text-emerald-200 font-medium tracking-wider">GROWTH TRACKER</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Real-time Platform Growth
              </h3>
              <p className="text-emerald-100 mb-8 text-lg leading-relaxed">
                Our platform grows with our farmers. Every milestone represents thousands 
                of success stories and measurable impact across the agricultural ecosystem.
              </p>
              <button className="group bg-white text-emerald-600 hover:bg-gray-50 font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl flex items-center gap-3">
                <span>View Success Stories</span>
                <svg 
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </div>
            
            <div className="space-y-8">
              {metrics.map((metric, index) => (
                <div key={index} className="group hover:transform hover:translate-x-2 transition-transform duration-300">
                  <div className="flex justify-between text-sm mb-3">
                    <span className="font-medium text-emerald-100">{metric.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xl">{animatedPercentages[index]}%</span>
                      {animatedPercentages[index] < metric.percentage && hasAnimated && (
                        <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-emerald-700/50 h-4 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className={`h-full ${metric.color} rounded-full transition-all duration-300 ease-out relative`}
                      style={{ 
                        width: `${animatedPercentages[index]}%`,
                        transition: `width ${metric.duration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`
                      }}
                    >
                      {/* Animated shimmer effect */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                        style={{
                          backgroundSize: '200% 100%',
                          animation: hasAnimated ? 'shimmer 2s infinite' : 'none'
                        }}
                      ></div>
                    </div>
                  </div>
                  {/* Percentage change indicator */}
                  <div className="text-xs text-emerald-200 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    +{Math.floor(Math.random() * 5) + 1}% from last quarter
                  </div>
                </div>
              ))}
              
              {/* Performance summary */}
              <div className="border-t border-emerald-400/30 mt-0">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-emerald-100">Overall Performance Score</span>
                  <span className="font-bold text-emerald-300 text-lg">
                    {Math.floor(metrics.reduce((acc, metric, idx) => acc + animatedPercentages[idx], 0) / metrics.length)}%
                  </span>
                </div>
                <div className="text-xs text-emerald-200 mt-1">
                  Average improvement across all metrics
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partner Logos */}
        <div className="mt-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-0.5 bg-emerald-200 rounded-full"></div>
            <h4 className="text-center text-gray-600 text-lg font-medium">Trusted by leading agricultural organizations</h4>
            <div className="w-10 h-0.5 bg-emerald-200 rounded-full"></div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12 opacity-60 hover:opacity-80 transition-opacity duration-300">
            {[
              { name: "AGRA", color: "text-blue-600" },
              { name: "FAO", color: "text-green-600" },
              { name: "USAID", color: "text-blue-500" },
              { name: "World Bank", color: "text-cyan-600" },
              { name: "IFAD", color: "text-emerald-600" },
              { name: "UNDP", color: "text-teal-600" }
            ].map((partner, index) => (
              <div 
                key={index}
                className="group relative"
              >
                <div className="text-2xl font-bold text-gray-700 transition-all duration-300 group-hover:scale-110 group-hover:text-emerald-600">
                  {partner.name}
                </div>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300"></div>
              </div>
            ))}
          </div>
          <div className="text-center text-gray-500 text-sm mt-6">
            Strategic partnerships driving agricultural innovation
          </div>
        </div>
      </div>

      {/* CSS for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default StatsSection;