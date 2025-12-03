import React from "react";
import { FiTrendingUp } from "react-icons/fi";

const DashboardStatistics = () => {

  const stats = [
    {
      title: "CB Investment Return",
      value: "KES 25,000,000",
      change: "+10% this year (or another comparative term here)",
    },
    {
      title: "Number of Funding Request",
      value: "20",
      change: "+10% this year (or another comparative term here)",
    },
    {
      title: "Number of Projects",
      value: "300",
      change: "+10% this year (or another comparative term here)",
    },
    {
      title: "Number of Funded Request",
      value: "16",
      change: "+10% this year (or another comparative term here)",
    },
    {
      title: "Total Value of Funded Request",
      value: "KES 204,546,000",
      change: "+10% this year (or another comparative term here)",
    },
    {
      title: "Turn Around Time on Funding Request",
      value: "14 Days",
      change: "+10% this year (or another comparative term here)",
    },
  ];

  return (
    <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Statistic Cards */}
      <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100"
          >
            <h3 className="text-primary font-semibold text-sm mb-2">
              {item.title}
            </h3>

            <p className="text-2xl font-bold text-gray-800">{item.value}</p>

            {/* Growth */}
            <div className="flex items-center gap-2 mt-3 text-green-600 text-sm">
              <FiTrendingUp className="text-green-500" />
              <span>{item.change}</span>
            </div>
          </div>
        ))}

      </div>

      {/* Highlights Card (Right Side) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
        <h3 className="text-primary font-semibold mb-4">Highlights</h3>

        <ul className="text-gray-700 text-sm space-y-3">
          <li>
            <span className="text-green-600 font-medium">30</span> financing
            requests made in the last 30 days
          </li>

          <li>
            <span className="text-green-600 font-medium">3 out of 50</span> trade
            finance requests are pending approval
          </li>

          <li>
            <span className="text-green-600 font-medium">12</span> farmers have
            been recommended for financing in the last 30 days
          </li>

          <li>
            <span className="text-green-600 font-medium">3</span> Trade finance
            requests are pending approval
          </li>

          <li>
            Demand for trade financing requests has increased by{" "}
            <span className="text-green-600 font-medium">50%</span> in the last
            30 days
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardStatistics;
