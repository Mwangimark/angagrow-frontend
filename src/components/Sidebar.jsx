import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-white h-screen shadow-md p-4">
      <h1 className="text-xl font-bold mb-6">AngaGrow</h1>
      <nav className="flex flex-col space-y-2">
        <Link to="/" className="block px-4 py-2 hover:bg-gray-200 rounded">
          Home
        </Link>
        <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200 rounded">
          Profile
        </Link>

        {/* Crop Analysis with Upload & Predict */}
        <Link to="/crop-analysis" className="block px-4 py-2 hover:bg-gray-200 rounded">
          Crop Analysis
        </Link>

        <Link to="/orders" className="block px-4 py-2 hover:bg-gray-200 rounded">
          Orders
        </Link>
        <Link to="/reports" className="block px-4 py-2 hover:bg-gray-200 rounded">
          Reports
        </Link>
        <Link to="/drone-sprays" className="block px-4 py-2 hover:bg-gray-200 rounded">
          Drone Sprays
        </Link>
        <Link to="/community" className="block px-4 py-2 hover:bg-gray-200 rounded">
          Community
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
