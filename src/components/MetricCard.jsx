import React from "react";

const MetricCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
      <h3 className="text-gray-700 font-medium">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default MetricCard;
