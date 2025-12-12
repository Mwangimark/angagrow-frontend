import React from "react";
import { 
  FiTrendingUp, 
  FiDollarSign, 
  FiFileText, 
  FiGrid, 
  FiCheckCircle, 
  FiClock,
  FiActivity,
  FiTarget,
  FiUsers,
  FiTrendingDown,
  FiBarChart2,
  FiStar
} from "react-icons/fi";
import { 
  FaMoneyBillWave, 
  FaHandHoldingUsd, 
  FaChartLine,
  FaRocket,
  FaLightbulb,
  FaCalendarCheck
} from "react-icons/fa";
import { GiGrowth, GiMoneyStack } from "react-icons/gi";

const DashboardStatistics = () => {

  const stats = [
    {
      title: "CB Investment Return",
      value: "KES 25,000,000",
      change: "+10% this year",
      icon: <GiMoneyStack className="text-2xl" />,
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-indigo-50",
      borderColor: "border-purple-100",
      changeColor: "text-purple-600",
      badge: "High ROI",
    },
    {
      title: "Number of Funding Request",
      value: "20",
      change: "+15% this quarter",
      icon: <FiFileText className="text-2xl" />,
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      borderColor: "border-blue-100",
      changeColor: "text-blue-600",
      badge: "Active",
    },
    {
      title: "Number of Projects",
      value: "300",
      change: "+25% this year",
      icon: <FiGrid className="text-2xl" />,
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-gradient-to-br from-emerald-50 to-green-50",
      borderColor: "border-emerald-100",
      changeColor: "text-emerald-600",
      badge: "Growing",
    },
    {
      title: "Number of Funded Request",
      value: "16",
      change: "+80% success rate",
      icon: <FiCheckCircle className="text-2xl" />,
      color: "from-teal-500 to-green-600",
      bgColor: "bg-gradient-to-br from-teal-50 to-green-50",
      borderColor: "border-teal-100",
      changeColor: "text-teal-600",
      badge: "Approved",
    },
    {
      title: "Total Value of Funded Request",
      value: "KES 204,546,000",
      change: "+12% this quarter",
      icon: <FaMoneyBillWave className="text-2xl" />,
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
      borderColor: "border-amber-100",
      changeColor: "text-amber-600",
      badge: "Record High",
    },
    {
      title: "Turn Around Time on Funding Request",
      value: "14 Days",
      change: "-20% faster processing",
      icon: <FiClock className="text-2xl" />,
      color: "from-violet-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-violet-50 to-purple-50",
      borderColor: "border-violet-100",
      changeColor: "text-violet-600",
      badge: "Efficient",
    },
  ];

  return (
    <div className="w-full mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Statistic Cards */}
      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`relative ${item.bgColor} p-5 rounded-2xl shadow-lg border ${item.borderColor} transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl group overflow-hidden`}
          >
            {/* Background gradient effect */}
            <div className={`absolute top-0 right-0 w-20 h-20 ${item.color.replace('from-', 'from-').replace('to-', 'to-')} opacity-5 rounded-full -mr-6 -mt-6 blur-lg`}></div>
            
            {/* Icon container */}
            <div className={`absolute top-4 right-4 p-3 bg-gradient-to-br ${item.color} text-white rounded-xl shadow-md`}>
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="text-gray-700 font-semibold text-sm mb-3 pr-14">
              {item.title}
            </h3>

            {/* Value */}
            <p className="text-3xl font-bold text-gray-900 mb-4">{item.value}</p>

            {/* Growth indicator */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-full ${item.changeColor.replace('text-', 'bg-')} bg-opacity-20`}>
                  <FiTrendingUp className={`${item.changeColor}`} />
                </div>
                <span className={`text-sm font-medium ${item.changeColor}`}>
                  {item.change}
                </span>
              </div>
              
              {/* Badge */}
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${item.changeColor.replace('text-', 'bg-')} ${item.changeColor.replace('text-', 'text-')} bg-opacity-20`}>
                {item.badge}
              </span>
            </div>

            {/* Bottom decorative line */}
            <div className={`absolute bottom-0 left-0 w-1/3 h-1 ${item.color.replace('from-', 'bg-gradient-to-r ')} rounded-full`}></div>
          </div>
        ))}
      </div>

      {/* Highlights Card (Right Side) */}
      <div className="relative bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-xl border border-gray-200 h-fit transform transition-all duration-300 hover:shadow-2xl">
        {/* Background effect */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full -mr-8 -mt-8 blur-xl opacity-60"></div>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-md">
            <FaChartLine className="text-2xl text-white" />
          </div>
          <h3 className="text-gray-800 font-bold text-xl">Performance Highlights</h3>
        </div>

        <ul className="text-gray-700 space-y-4 relative z-10">
          {[
            {
              icon: <FiActivity className="text-green-500" />,
              text: <><span className="font-bold text-green-600">30</span> financing requests made in the last 30 days</>,
              bg: "bg-green-50"
            },
            {
              icon: <FiTarget className="text-blue-500" />,
              text: <><span className="font-bold text-blue-600">3 out of 50</span> trade finance requests are pending approval</>,
              bg: "bg-blue-50"
            },
            {
              icon: <FiUsers className="text-purple-500" />,
              text: <><span className="font-bold text-purple-600">12</span> farmers have been recommended for financing in the last 30 days</>,
              bg: "bg-purple-50"
            },
            {
              icon: <FiClock className="text-amber-500" />,
              text: <><span className="font-bold text-amber-600">3</span> Trade finance requests are pending approval</>,
              bg: "bg-amber-50"
            },
            {
              icon: <GiGrowth className="text-emerald-500" />,
              text: <>Demand for trade financing requests has increased by <span className="font-bold text-emerald-600">50%</span> in the last 30 days</>,
              bg: "bg-emerald-50"
            },
            {
              icon: <FaRocket className="text-rose-500" />,
              text: <><span className="font-bold text-rose-600">98%</span> customer satisfaction rate for funding processing</>,
              bg: "bg-rose-50"
            },
          ].map((highlight, index) => (
            <li 
              key={index} 
              className={`flex items-start gap-4 p-3 ${highlight.bg} rounded-xl hover:shadow-sm transition-all duration-200`}
            >
              <div className="p-2 bg-white rounded-lg shadow-sm">
                {highlight.icon}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-800">{highlight.text}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {index === 0 && "↑ 25% from previous month"}
                  {index === 1 && "↓ 40% faster review process"}
                  {index === 2 && "↑ 8 new recommendations this week"}
                  {index === 3 && "Average resolution: 2.5 days"}
                  {index === 4 && "Market growth accelerating"}
                  {index === 5 && "Based on 120+ reviews"}
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Summary footer */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaCalendarCheck className="text-gray-400" />
              <span>Last updated: Today</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-sm text-green-600 font-semibold">
                <FiTrendingUp />
                <span>Overall Growth: +18%</span>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Decorative corner */}
        <div className="absolute bottom-4 right-4 p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg">
          <FiStar className="text-green-400" />
        </div>
      </div>
    </div>
  );
};

export default DashboardStatistics;