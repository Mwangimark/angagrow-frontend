import React from "react";

const DashboardStats = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: ROI + Top Performing Instruments */}
        <div className="col-span-2 space-y-6">
          {/* ROI Overview */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center md:items-start md:justify-start space-x-6">
            {/* Pie Chart */}
            <div className="w-32 h-32 relative">
              <svg viewBox="0 0 36 36" className="w-full h-full">
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
                  className="text-teal-500"
                  strokeWidth="3"
                  strokeDasharray="60, 40"
                  stroke="currentColor"
                  fill="transparent"
                  r="16"
                  cx="18"
                  cy="18"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
                60%
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Credible Blooms Return on Investment Overview
              </h2>
              <ul className="mt-2 text-gray-500">
                <li>
                  <span className="inline-block w-3 h-3 bg-teal-500 rounded-full mr-2"></span>
                  Interest Earning
                </li>
                <li className="mt-1">
                  <span className="inline-block w-3 h-3 bg-blue-800 rounded-full mr-2"></span>
                  Non-Interest Earning
                </li>
              </ul>
              <p className="mt-2 text-green-500 font-medium">
                +10% overall increase in accounts expected in the next two months
              </p>
            </div>
          </div>

          {/* Top Performing Farms */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Top Performing Farms Financing Instruments
            </h2>
            <div className="space-y-4">
              {[
                { name: "LPO Financing", amount: "KES 6 Billion", color: "bg-orange-500", progress: 0.8 },
                { name: "Letter of Credit", amount: "KES 4 Billion", color: "bg-teal-500", progress: 0.6 },
                { name: "Supply Chain Financing", amount: "KES 3 Billion", color: "bg-blue-800", progress: 0.75 },
              ].map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">{item.name}</span>
                    <span className="text-gray-800 font-medium">{item.amount}</span>
                  </div>
                  <div className="w-full bg-gray-200 h-3 rounded-full">
                    <div
                      className={`${item.color} h-3 rounded-full`}
                      style={{ width: `${item.progress * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Highlights */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Highlights</h2>
          <ul className="text-gray-600 space-y-2 list-disc list-inside">
            <li>
              In the last 30 days, uptake of LPO financing products increased by{" "}
              <span className="text-green-500 font-medium">50%</span>
            </li>
            <li>
              In the last 30 days, uptake of supply chain financing decreased by{" "}
              <span className="text-red-500 font-medium">35%</span>
            </li>
            <li>
              <span className="text-green-500 font-medium">100</span> CB buyers repaid their loans within 60 days.
            </li>
            <li>
              <span className="text-orange-500 font-medium">50</span> buyers of CB are due to make payment within 7 days.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
