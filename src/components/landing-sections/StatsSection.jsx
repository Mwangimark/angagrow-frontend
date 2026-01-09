import React from 'react';
import { FiTrendingUp, FiUsers, FiDollarSign, FiGlobe } from 'react-icons/fi';
import { FaSeedling, FaChartLine, FaTractor, FaLeaf } from 'react-icons/fa';

const StatsSection = () => {
  const stats = [
    {
      icon: <FaSeedling className="text-3xl" />,
      value: "10,000+",
      label: "Active Farms",
      change: "+25% this year",
      color: "from-emerald-500 to-green-500",
      description: "Farms using our platform"
    },
    {
      icon: <FiTrendingUp className="text-3xl" />,
      value: "KES 2.5B",
      label: "Farmer Revenue",
      change: "+40% growth",
      color: "from-amber-500 to-orange-500",
      description: "Generated through platform"
    },
    {
      icon: <FiUsers className="text-3xl" />,
      value: "50,000+",
      label: "Farmers Empowered",
      change: "+15,000 new users",
      color: "from-blue-500 to-cyan-500",
      description: "Across East Africa"
    },
    {
      icon: <FaChartLine className="text-3xl" />,
      value: "65%",
      label: "Average Yield Increase",
      change: "Industry leading",
      color: "from-purple-500 to-pink-500",
      description: "For AgnaGrow users"
    },
    {
      icon: <FaTractor className="text-3xl" />,
      value: "500K+",
      label: "Acres Monitored",
      change: "+150K acres",
      color: "from-teal-500 to-emerald-500",
      description: "Using IoT sensors"
    },
    {
      icon: <FiDollarSign className="text-3xl" />,
      value: "40%",
      label: "Cost Reduction",
      change: "Average savings",
      color: "from-red-500 to-rose-500",
      description: "For farmers"
    },
    {
      icon: <FiGlobe className="text-3xl" />,
      value: "15",
      label: "Countries",
      change: "Expanding globally",
      color: "from-indigo-500 to-blue-500",
      description: "Serving farmers"
    },
    {
      icon: <FaLeaf className="text-3xl" />,
      value: "2.5M",
      label: "Trees Planted",
      change: "Sustainability effort",
      color: "from-green-500 to-emerald-500",
      description: "Through our program"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Impact in 
            <span className="text-emerald-600"> Numbers</span>
          </h2>
          <p className="text-xl text-gray-600">
            See how AgnaGrow is transforming agriculture across Africa
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className={`inline-flex p-3 bg-gradient-to-br ${stat.color} text-white rounded-xl mb-4`}>
                {stat.icon}
              </div>
              
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              
              <div className="text-lg font-semibold text-gray-800 mb-2">
                {stat.label}
              </div>
              
              <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium mb-3">
                <FiTrendingUp />
                <span>{stat.change}</span>
              </div>
              
              <div className="text-gray-600 text-sm">
                {stat.description}
              </div>
              
              {/* Hover effect line */}
              <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${stat.color} transition-all duration-500 mt-4 rounded-full`}></div>
            </div>
          ))}
        </div>

        {/* Progress Metrics */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">
                Real-time Platform Growth
              </h3>
              <p className="text-emerald-100 mb-6">
                Our platform grows with our farmers. Every milestone represents thousands 
                of success stories.
              </p>
              <button className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
                View Success Stories
              </button>
            </div>
            
            <div className="space-y-6">
              {[
                { label: "Farm Onboarding", percentage: 85, color: "bg-emerald-300" },
                { label: "Yield Improvement", percentage: 92, color: "bg-teal-300" },
                { label: "Cost Reduction", percentage: 78, color: "bg-green-300" },
                { label: "Market Access", percentage: 88, color: "bg-cyan-300" },
              ].map((metric, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{metric.label}</span>
                    <span>{metric.percentage}%</span>
                  </div>
                  <div className="w-full bg-emerald-700 h-3 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${metric.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${metric.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partner Logos */}
        <div className="mt-16">
          <h4 className="text-center text-gray-600 mb-8">Trusted by leading agricultural organizations</h4>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            <div className="text-2xl font-bold text-gray-400">AGRA</div>
            <div className="text-2xl font-bold text-gray-400">FAO</div>
            <div className="text-2xl font-bold text-gray-400">USAID</div>
            <div className="text-2xl font-bold text-gray-400">World Bank</div>
            <div className="text-2xl font-bold text-gray-400">IFAD</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;