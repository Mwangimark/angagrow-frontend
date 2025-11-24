import React from "react";

function YieldChart({ title }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-64 flex items-center justify-center">
      <h2 className="text-gray-700 font-semibold mb-2">{title}</h2>
      <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded">
        <p className="text-gray-500">Chart Placeholder</p>
      </div>
    </div>
  );
}

export default YieldChart;
