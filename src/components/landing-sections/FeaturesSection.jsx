import React from 'react';
import {
  FiMonitor,
  FiDroplet,
  FiDollarSign,
  FiTrendingUp,
  FiShield,
  FiSmartphone,
  FiDatabase,
  FiArrowRight,
  FiTarget,
} from "react-icons/fi";
import { FaRobot, FaSeedling, FaChartLine, FaLeaf } from "react-icons/fa";
import { GiWaterDrop, GiGrowth } from "react-icons/gi";

// Images
import monitoringImg from "../../assets/features/monitoring.jpg";

const FeaturesSection = () => {
  const features = [
    {
      title: "Smart Monitoring",
      description: "Real-time soil, weather, and crop health tracking using IoT sensors.",
      icon: <FiMonitor className="text-xl" />,
      image: monitoringImg,
      stat: "24/7 Monitoring",
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      secondaryIcon: <FiTarget className="text-emerald-500" />
    },
    {
      title: "Precision Irrigation",
      description: "Automated watering optimized by soil moisture and weather data.",
      icon: <FiDroplet className="text-xl" />,
      image: "https://images.unsplash.com/photo-1628746406382-1a1d8edf6c71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stat: "Save 40% Water",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      secondaryIcon: <GiWaterDrop className="text-blue-500" />
    },
    {
      title: "AI Predictions",
      description: "Machine learning predicts planting windows and expected yields.",
      icon: <FaRobot className="text-xl" />,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stat: "95% Accuracy",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      secondaryIcon: <FaChartLine className="text-purple-500" />
    },
    {
      title: "Market Insights",
      description: "Live market prices and trends to maximize profitability.",
      icon: <FiDollarSign className="text-xl" />,
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stat: "Live Prices",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      secondaryIcon: <FiTrendingUp className="text-amber-500" />
    },
    {
      title: "Crop Advisory",
      description: "Personalized fertilizer and crop rotation recommendations.",
      icon: <FaSeedling className="text-xl" />,
      image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stat: "Expert Guidance",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      secondaryIcon: <FaLeaf className="text-green-500" />
    },
    {
      title: "Risk Management",
      description: "Financial and insurance tools to reduce crop loss risks.",
      icon: <FiShield className="text-xl" />,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stat: "Risk Coverage",
      color: "from-red-500 to-rose-500",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      secondaryIcon: <FiShield className="text-red-500" />
    },
    {
      title: "Mobile Access",
      description: "Manage your farm operations anywhere, anytime.",
      icon: <FiSmartphone className="text-xl" />,
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stat: "Anywhere Access",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
      secondaryIcon: <FiSmartphone className="text-indigo-500" />
    },
    {
      title: "Data Analytics",
      description: "Deep insights and reports for smarter decision-making.",
      icon: <FiDatabase className="text-xl" />,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stat: "Advanced Analytics",
      color: "from-teal-500 to-emerald-500",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
      secondaryIcon: <FiDatabase className="text-teal-500" />
    },
  ];

  return (
    <section className="relative py-2 bg-gradient-to-b from-white via-emerald-50/30 to-white" id="features">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-r from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-r from-green-100/30 to-cyan-100/30 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              Smart Farming Solutions
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            AngaGrow integrates cutting-edge technology with agricultural expertise 
            to deliver comprehensive solutions for modern farming challenges.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative ${feature.bgColor} rounded-3xl overflow-hidden
                border border-gray-100/80 shadow-lg hover:shadow-2xl 
                hover:-translate-y-2 transition-all duration-500`}
            >
              {/* Image Container with Gradient Overlay */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${feature.color} opacity-20`}></div>
                
                {/* Floating Icon Badge */}
                <div className="absolute top-4 right-4">
                  <div className={`p-3 bg-gradient-to-br ${feature.color} text-white rounded-xl shadow-lg 
                    transform group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                </div>
                
                {/* Corner Decoration */}
                <div className={`absolute bottom-0 left-0 w-16 h-16 -mb-8 -ml-8 
                  bg-gradient-to-br ${feature.color} opacity-10 rounded-full blur-xl`}>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 relative">
                {/* Icon in Content */}
                <div className="absolute -top-6 left-6">
                  <div className={`p-3 bg-white rounded-xl shadow-md 
                    group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.secondaryIcon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 pt-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Stat and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100/80">
                  <span className={`px-4 py-1.5 text-xs font-bold rounded-full 
                    ${feature.iconColor} bg-white border border-gray-200
                    group-hover:bg-gradient-to-r ${feature.color} group-hover:text-white 
                    group-hover:border-transparent transition-all duration-300`}
                  >
                    {feature.stat}
                  </span>

                  <div className="w-9 h-9 flex items-center justify-center rounded-full 
                    bg-white border border-gray-200 group-hover:bg-gradient-to-r ${feature.color}
                    group-hover:border-transparent transition-all duration-300"
                  >
                    <FiArrowRight className={`text-gray-400 group-hover:text-white 
                      group-hover:translate-x-0.5 transition-all duration-300`}
                    />
                  </div>
                </div>
              </div>
              
              {/* Hover Effect Line */}
              <div className={`absolute bottom-0 left-0 w-full h-1 
                bg-gradient-to-r ${feature.color} opacity-0 
                group-hover:opacity-100 transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}>
          </div>
          
          {/* Main Banner Content */}
          <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 p-10 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { value: "10K+", label: "Active Farms", icon: "🏡", description: "and growing daily" },
                { value: "40%", label: "Cost Reduction", icon: "💰", description: "average savings" },
                { value: "500K+", label: "Acres Monitored", icon: "🌾", description: "and counting" },
                { value: "24/7", label: "Support", icon: "🛠️", description: "always available" },
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-5xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold mb-1">{stat.label}</div>
                  <div className="text-emerald-100 text-sm">{stat.description}</div>
                </div>
              ))}
            </div>
            
            {/* Bottom CTA */}
            <div className="mt-10 pt-8 border-t border-emerald-500/30 text-center">
              <p className="text-emerald-100 text-lg mb-4">
                Ready to join thousands of successful farmers?
              </p>
              <button className="bg-white text-emerald-700 hover:bg-gray-100 
                font-bold px-8 py-3 rounded-xl transition-all duration-300 
                transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Free Trial Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;