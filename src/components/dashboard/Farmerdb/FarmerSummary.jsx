// FarmerSummary.jsx
import React from 'react';

const FarmerSummary = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm font-sans">
      {/* Main Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Total Est. Yield */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-700 font-medium">Total Est. Yield</h3>
            <span className="text-green-600 text-lg">↑</span>
          </div>
          <div className="text-2xl font-bold text-blue-900 mb-1">33,000T</div>
        </div>

        {/* Total Est. Value of Yield */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-700 font-medium">Total Est.Value of Yield</h3>
            <span className="text-green-600 text-lg">↑</span>
          </div>
          <div className="text-2xl font-bold text-green-900 mb-1">KES. 200 M</div>
          <div className="text-sm text-green-600 font-medium">
            15% increase from Last Month
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Harvest Highlights & Status Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Harvest Highlights */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">Harvest Highlights</h3>
            <ul className="space-y-2">
              <li className="text-gray-700">• Interested buyers 20.</li>
              <li className="text-gray-700">
                • This is an YTD growth of 7% representing a KES 100M growth.
              </li>
              <li className="text-gray-700">• Projected growth rate is 12%</li>
            </ul>
          </div>

          {/* Status Summary */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Status Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Cycle Yield */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Cycle Yield</h4>
                <div className="text-lg font-bold text-purple-800 mb-1">Number: 20,000 T</div>
                <div className="text-md font-semibold text-purple-700">Value: KES. 177M</div>
              </div>

              {/* Buyer Pending Sales */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Buyer Pending Sales</h4>
                <div className="text-lg font-bold text-orange-800 mb-1">Number: 7,000T</div>
                <div className="text-md font-semibold text-orange-700">Value: KES. 50M</div>
              </div>

              {/* Completed Sales */}
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-xl border border-teal-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Completed Sales</h4>
                <div className="text-lg font-bold text-teal-800 mb-1">Number: 10,000T</div>
                <div className="text-md font-semibold text-teal-700">Value: KES. 120M</div>
              </div>

              {/* Number of Orders */}
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-xl border border-pink-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Number of Orders</h4>
                <div className="text-lg font-bold text-pink-800 mb-1">Number: 3,000T</div>
                <div className="text-md font-semibold text-pink-700">Value: KES. 7M</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Current Cycle Highlights */}
          <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
            <h3 className="font-semibold text-gray-800 mb-3">Current Cycle Highlights</h3>
            <ul className="space-y-2">
              <li className="text-gray-700">• Total buyer commitments are now 102M.</li>
              <li className="text-gray-700">
                • This is an YTD growth of 100M representing a 6.8% growth.
              </li>
              <li className="text-gray-700">• Projected growth rate is 12%</li>
              <li className="text-gray-700">
                • This is an YTD growth of 102M representing a 6.8% growth.
              </li>
            </ul>
          </div>

          {/* Crops Analysis Done */}
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-5 rounded-xl border border-indigo-200">
            <h3 className="text-gray-700 font-medium mb-2">Crops Analysis Done</h3>
            <div className="text-2xl font-bold text-indigo-900 mb-1">Number: 60 HA</div>
            <div className="text-lg font-semibold text-indigo-800">Value: KES. 5.7B</div>
          </div>

          {/* Sprays Done */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-5 rounded-xl border border-emerald-200">
            <h3 className="text-gray-700 font-medium mb-2">Sprays Done</h3>
            <div className="text-2xl font-bold text-emerald-900 mb-1">Number: 20 Sprays</div>
            <div className="text-lg font-semibold text-emerald-800">Value: KES. 800K</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerSummary;