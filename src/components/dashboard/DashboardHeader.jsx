import React from "react";
import { FiCalendar, FiArrowRight, FiBell } from "react-icons/fi";
import DashboardStatistics from "./DashboardStatistics";
import Header from "./Header";

const DashboardHeader = () => {
  return (
    <>
      {/* Top row: breadcrumb (left) + user area (right) */}
      <Header/>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        {/* Left - Filter text */}
        <div className="text-gray-500 font-medium">
          Filter by:
        </div>

        {/* Middle - Date Pickers & Button */}
        <div className="flex flex-wrap items-center gap-3">

          {/* From Date */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-white">
            <FiCalendar className="text-gray-500" />
            <input
              type="date"
              className="focus:outline-none text-sm"
            />
          </div>

          {/* To Date */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-white">
            <FiCalendar className="text-gray-500" />
            <input
              type="date"
              className="focus:outline-none text-sm"
            />
          </div>

          {/* Apply Filter */}
          <button
            className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-5 py-2 rounded-lg shadow hover:from-purple-700 hover:to-violet-700 transition text-sm"
          >
            Apply Filter
          </button>

        </div>

        {/* Right - Export Button */}
        <button className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 transition px-5 py-2 rounded-lg text-sm">
          Export to PDF
          <FiArrowRight className="text-gray-600" />
        </button>

      </div>
    </>
  );
};

export default DashboardHeader;
