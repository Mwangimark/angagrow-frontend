import React from "react";
import { 
  FiTrendingUp, 
  FiTrendingDown, 
  FiPieChart, 
  FiAward,
  FiDollarSign,
  FiCreditCard,
  FiTruck,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiActivity,
  FiStar
} from "react-icons/fi";
import { 
  FaChartLine, 
  FaMoneyCheckAlt, 
  FaBalanceScale,
  FaPercentage,
  FaRegChartBar,
  FaSeedling
} from "react-icons/fa";
import { GiGrowth, GiFruitTree, GiPlantWatering } from "react-icons/gi";

const DashboardStats = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: ROI + Top Performing Instruments */}
        <div className="lg:col-span-2 space-y-6">
          {/* ROI Overview */}
          <div className="relative bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-xl border border-gray-100 transform transition-all duration-300 hover:shadow-2xl">
            {/* Background decorative elements */}
            <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-full blur-xl opacity-60"></div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Enhanced Pie Chart */}
              <div className="relative flex-shrink-0">
                <div className="w-40 h-40 relative">
                  <svg viewBox="0 0 36 36" className="w-full h-full transform rotate-[-90deg]">
                    <circle
                      className="text-gray-200"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="transparent"
                      r="16"
                      cx="18"
                      cy="18"
                    />
                    <circle
                      className="text-emerald-500"
                      strokeWidth="3"
                      strokeDasharray="60, 40"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="16"
                      cx="18"
                      cy="18"
                    />
                    <circle
                      className="text-blue-800"
                      strokeWidth="3"
                      strokeDasharray="40, 60"
                      strokeDashoffset="60"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="16"
                      cx="18"
                      cy="18"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-gray-800">60%</span>
                    <span className="text-sm text-gray-600 mt-1">ROI</span>
                    <div className="flex items-center gap-1 mt-2 text-emerald-600 text-xs">
                      <FiTrendingUp />
                      <span>+10%</span>
                    </div>
                  </div>
                </div>
                
                {/* Legend dots */}
                <div className="flex justify-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Interest</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-800 rounded-full"></div>
                    <span className="text-xs text-gray-600">Non-Interest</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-md">
                    <FiPieChart className="text-2xl text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Credible Blooms ROI Overview
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-white rounded-xl border border-emerald-100">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <FaPercentage className="text-emerald-600 text-xl" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">Current ROI Rate</div>
                      <div className="text-2xl font-bold text-emerald-600">60%</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-white rounded-xl border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <GiGrowth className="text-blue-600" />
                      <span className="font-semibold text-gray-800">Growth Projection</span>
                    </div>
                    <p className="text-emerald-600 font-medium text-sm">
                      <span className="inline-flex items-center gap-1 bg-emerald-100 px-3 py-1 rounded-full">
                        <FiTrendingUp />
                        +10% overall increase in accounts expected in the next two months
                      </span>
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm font-medium">Interest Earning</span>
                      </div>
                      <div className="text-lg font-bold text-gray-800">KES 42M</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 bg-blue-800 rounded-full"></div>
                        <span className="text-sm font-medium">Non-Interest Earning</span>
                      </div>
                      <div className="text-lg font-bold text-gray-800">KES 28M</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Performing Farms */}
          <div className="relative bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-xl border border-gray-100 transform transition-all duration-300 hover:shadow-2xl">
            {/* Background effect */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full blur-xl opacity-50"></div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl shadow-md">
                <FiAward className="text-2xl text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Top Performing Farms Financing Instruments
              </h2>
            </div>
            
            <div className="space-y-6">
              {[
                { 
                  name: "LPO Financing", 
                  amount: "KES 6 Billion", 
                  color: "from-orange-500 to-amber-500",
                  bgColor: "bg-gradient-to-r from-orange-50 to-amber-50",
                  borderColor: "border-orange-100",
                  icon: <FaMoneyCheckAlt className="text-orange-600" />,
                  progress: 0.8,
                  growth: "+50%",
                  growthIcon: <FiTrendingUp className="text-green-500" />,
                  farms: "120 Farms"
                },
                { 
                  name: "Letter of Credit", 
                  amount: "KES 4 Billion", 
                  color: "from-teal-500 to-emerald-500",
                  bgColor: "bg-gradient-to-r from-teal-50 to-emerald-50",
                  borderColor: "border-teal-100",
                  icon: <FiCreditCard className="text-teal-600" />,
                  progress: 0.6,
                  growth: "+35%",
                  growthIcon: <FiTrendingUp className="text-green-500" />,
                  farms: "85 Farms"
                },
                { 
                  name: "Supply Chain Financing", 
                  amount: "KES 3 Billion", 
                  color: "from-blue-700 to-blue-900",
                  bgColor: "bg-gradient-to-r from-blue-50 to-indigo-50",
                  borderColor: "border-blue-100",
                  icon: <FiTruck className="text-blue-700" />,
                  progress: 0.75,
                  growth: "-35%",
                  growthIcon: <FiTrendingDown className="text-red-500" />,
                  farms: "65 Farms"
                },
              ].map((item) => (
                <div 
                  key={item.name} 
                  className={`p-4 ${item.bgColor} rounded-xl border ${item.borderColor} hover:shadow-md transition-all duration-200`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <GiFruitTree className="text-gray-400" />
                          <span>{item.farms}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{item.amount}</div>
                      <div className="flex items-center gap-1 justify-end text-sm mt-1">
                        {item.growthIcon}
                        <span className={`font-medium ${item.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {item.growth}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress bar with percentage */}
                  <div className="mt-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Utilization</span>
                      <span className="font-semibold">{Math.round(item.progress * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                      <div
                        className={`h-3 rounded-full bg-gradient-to-r ${item.color} shadow-inner`}
                        style={{ width: `${item.progress * 100}%` }}
                      >
                        <div className="w-full h-full bg-gradient-to-r from-white/30 to-transparent"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Highlights */}
        <div className="relative bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-xl border border-gray-100 h-fit transform transition-all duration-300 hover:shadow-2xl">
          {/* Background effect */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full blur-xl opacity-50"></div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-md">
              <FaChartLine className="text-2xl text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Performance Highlights</h2>
          </div>
          
          <div className="space-y-4">
            {[
              {
                icon: <FiTrendingUp className="text-green-500" />,
                text: "In the last 30 days, uptake of LPO financing products increased by",
                value: "50%",
                valueColor: "text-green-600",
                bgColor: "bg-green-50",
                trend: "Rapid Growth",
                metric: "KES 2.4B"
              },
              {
                icon: <FiTrendingDown className="text-red-500" />,
                text: "In the last 30 days, uptake of supply chain financing decreased by",
                value: "35%",
                valueColor: "text-red-600",
                bgColor: "bg-red-50",
                trend: "Market Shift",
                metric: "KES 750M"
              },
              {
                icon: <FiCheckCircle className="text-emerald-500" />,
                text: "CB buyers repaid their loans within 60 days",
                value: "100",
                valueColor: "text-emerald-600",
                bgColor: "bg-emerald-50",
                trend: "Excellent Repayment",
                metric: "98% Rate"
              },
              {
                icon: <FiClock className="text-amber-500" />,
                text: "Buyers of CB are due to make payment within 7 days",
                value: "50",
                valueColor: "text-amber-600",
                bgColor: "bg-amber-50",
                trend: "Upcoming Payments",
                metric: "KES 15M"
              },
            ].map((highlight, index) => (
              <div 
                key={index} 
                className={`p-4 ${highlight.bgColor} rounded-xl border border-opacity-50 hover:shadow-sm transition-all duration-200`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm mt-1">
                    {highlight.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-700">
                      {highlight.text}{" "}
                      <span className={`font-bold ${highlight.valueColor}`}>
                        {highlight.value}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <div className={`text-xs font-semibold px-2 py-1 rounded-full ${highlight.valueColor.replace('text-', 'bg-')} ${highlight.valueColor} bg-opacity-20`}>
                          {highlight.trend}
                        </div>
                        <span className="text-xs text-gray-500">{highlight.metric}</span>
                      </div>
                      {index === 0 && <FiStar className="text-amber-400" />}
                      {index === 2 && <GiPlantWatering className="text-emerald-400" />}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Summary footer */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiActivity className="text-gray-400" />
                <span className="text-sm text-gray-600">30-Day Period</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
                  <FiTrendingUp />
                  <span>Net Growth: +18%</span>
                </div>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Based on 240+ active farm financing accounts
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;