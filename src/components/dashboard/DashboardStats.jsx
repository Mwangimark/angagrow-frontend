import React from "react";

const DashboardStats = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      {/* Date Range Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="DD/MM/YY"
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <span className="text-gray-500">to</span>
              <input
                type="text"
                placeholder="DD/MM/YY"
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
        <button className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-200">
          Update Period
        </button>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Total Est. Yield */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">Total Est. Yield</h3>
            <span className="flex items-center text-green-600 font-medium">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              10% increase
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">33,000T</div>
          <p className="text-gray-600">10% increase from Last Month</p>
        </div>

        {/* Total Est. Value of Yield */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">Total Est. Value of Yield</h3>
            <span className="flex items-center text-blue-600 font-medium">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              15% increase
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">KES. 200 M</div>
          <p className="text-gray-600">15% increase from Last Month</p>
        </div>
      </div>

      {/* Status Summary Grid */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Status Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Cycle Yield", number: "20,000 T", value: "KES. 177M", color: "from-purple-50 to-purple-100", border: "border-purple-200" },
            { title: "Buyer Pending Sales", number: "7,000T", value: "KES. 50M", color: "from-amber-50 to-amber-100", border: "border-amber-200" },
            { title: "Crops Analysis Done", number: "60 HA", value: "KES. 5.7B", color: "from-emerald-50 to-emerald-100", border: "border-emerald-200" },
            { title: "Completed Sales", number: "10,000T", value: "KES. 120M", color: "from-green-50 to-green-100", border: "border-green-200" },
            { title: "Number of Orders", number: "3,000T", value: "KES. 7M", color: "from-blue-50 to-blue-100", border: "border-blue-200" },
            { title: "Sprays Done", number: "20 Sprays", value: "KES. 800K", color: "from-cyan-50 to-cyan-100", border: "border-cyan-200" },
          ].map((item, index) => (
            <div key={index} className={`bg-gradient-to-r ${item.color} rounded-xl p-4 border ${item.border}`}>
              <h4 className="font-medium text-gray-900 mb-2">{item.title}</h4>
              <div className="text-lg font-bold text-gray-900">{item.number}</div>
              <div className="text-sm text-gray-600">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Highlights Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Harvest Highlights */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Harvest Highlights</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-700">Interested buyers <span className="font-semibold">20</span></span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-700">This is an YTD growth of 7% representing a <span className="font-semibold">KES 100M</span> growth</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-700">Projected growth rate is <span className="font-semibold">12%</span></span>
            </li>
          </ul>
        </div>

        {/* Current Cycle Highlights */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Cycle Highlights</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-700">Total buyer commitments are now <span className="font-semibold">102M</span></span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-700">This is an YTD growth of <span className="font-semibold">100M</span> representing a <span className="font-semibold">6.9%</span> growth</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-700">Projected growth rate is <span className="font-semibold">12%</span></span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-700">This is an YTD growth of <span className="font-semibold">102M</span> representing a <span className="font-semibold">6.9%</span> growth</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Last updated: Today, {new Date().toLocaleDateString('en-GB')}
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200">
              Export PDF
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors duration-200">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;